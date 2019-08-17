const wap = require('webapi-parser').WebApiParser;
const transformJsonSchema = require('./json-schema');

/**
 * Transform a parsed Endpoint into a LeanAPI resource object.
 * 
 * @param {*} endpoint 
 */
const transformEndpointToResource = (endpoint) => {
    return {
        name: endpoint.relativePath,
        description: endpoint.description.value(),
        url: endpoint.path.value(),
        parameters: getParametersFromObject(endpoint, 'parameters'),
        calls: endpoint.operations.map(transformOperationToCall),

        // Children is always empty as they're filled at the end of the transform process
        children: []
    }
};

/**
 * Transform a parsed Operation into a LeanAPI call object.
 * 
 * @param {*} operation 
 */
const transformOperationToCall = (operation) => {
    return {
        method: operation.method.value(),
        name: operation.name.value(),
        description: operation.description.value(),
        query: getParametersFromObject(operation.request, 'queryParameters'),
        headers: getParametersFromObject(operation.request, 'headers'),
        responses: operation.responses.map(transformResponse),
        body: operation.request ? transformPayloadsToBody(operation.request.payloads) : []
    };
};

/**
 * Takes a set of payloads and transforms all their examples to the LeanAPI structure
 * of working with request/response body examples.
 * 
 * @param {*} payloads 
 */
const transformPayloadsToBody = (payloads) => {
    return payloads.map(payload => {
        return {
            name: payload.mediaType.value(),

            // JSON Schema is easier to parse
            schema: transformJsonSchema(payload.schema.toJsonSchema),

            // TODO: See if it's a valid case to concatenate actual example bodies
            example: payload.schema.examples.map(example => example.value.value()).join('\n\n OR \n\n')
        }
    });
};

/**
 * Transform a parsed Response object into a LeanAPI response object.
 * @param {*} response 
 */
const transformResponse = (response) => {
    return {
        code: response.statusCode.value(),
        description: response.description.value(),
        headers: getParametersFromObject(response, 'headers'),
        body: transformPayloadsToBody(response.payloads)
    };
}

/**
 * Get a parameter bag object from the given object and it's property. This can be used
 * for example to extract headers or query parameters.
 * 
 * @param {*} obj 
 * @param {string} parameterField 
 */
const getParametersFromObject = (obj, parameterField) => {
    if (!obj) {
        return [];
    }
    
    return obj[parameterField].map(parameter => {
        return {
            name: parameter.name.value(),
            description: parameter.description.value(),
            type: [],
            example: parameter.schema.examples.map(example => example.value).join(','),
            required: parameter.required.value()
        }
    });
}

module.exports = {

    SUPPORTED_PARSERS: {
        RAML10: 'raml10',
        OAS20: 'oas20'
    },

    parse: async function (path, parser) {
        const parsed = await wap[parser].parse(`file://${path}`);
        const resolved = await wap[parser].resolve(parsed);
        const api = resolved.encodes;

        const resources = api.endPoints.map(transformEndpointToResource);

        /**
         * At this point in time the API resources are one giant flat list. We need to identify
         * parent resources and pass the child resources into them.
         * 
         * Afterwards child resources are removed from the root.
         */
        const removals = [];
        resources.forEach(resource => {

            // TODO: figure out if this logic is actually valid
            const parent = resources.find(potentialParent => (potentialParent.url + resource.name) === resource.url);
            if (parent) {
                parent.children.push(resource);
                removals.push(resource.url);
            }
        });
        
        return {
            title: api.name.value(),
            description: api.description.value(),
            version: api.version.value(),

            // Set resources minus the children to be removed from the root
            resources: resources.filter(resource => removals.indexOf(resource.url) === -1)
        };
    }

}