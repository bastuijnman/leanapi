'use strict';

let parser = require('raml-1-parser');
let path = require('path');
let schemaDeref = require('json-schema-deref-sync');
let fs = require('fs');
let typesMap = {};

const checkIfGetterIsNeeded = function (checkParam) {
    return checkParam && typeof checkParam === 'object';
};

let getRequestHeaders = function (request, callback) {
    let headers = [].concat(request.headers());

    request.securedBy().forEach((scheme) => {
        if (!scheme.securityScheme()) {
            console.log('WARNING: Detected security scheme without body while adding headers.');
            return;
        }
        headers = headers.concat(scheme.securityScheme().describedBy().headers());
    });

    return headers.map(callback);
};

let getRequestResponses = function (request, callback) {
    let responses = [].concat(request.responses());

    request.securedBy().forEach((scheme) => {
        if (!scheme.securityScheme()) {
            console.log('WARNING: Detected security scheme without body while adding responses.');
            return;
        }
        responses = responses.concat(scheme.securityScheme().describedBy().responses());
    });

    return responses.map(callback).sort(function (a, b) {
        return a.code - b.code;
    });
};

module.exports = {

    parse (apiPath) {
        let api = parser.loadApiSync(apiPath).expand(true);

        if (api.RAMLVersion() !== 'RAML10') {
            console.log('Sorry, currently we only support RAML 1.0');
            process.exit(1);
        }

        // Reset the types map on parse
        typesMap = {};
        api.types().forEach(function (type) {
            let typeObj = type.toJSON()[type.name()];

            if (typeObj.typePropertyKind === 'JSON') {
                let schema = JSON.parse(fs.readFileSync(path.dirname(apiPath) + '/' + typeObj.schemaPath, 'utf-8'));
                typesMap[typeObj.name] = schemaDeref(schema, {
                    baseFolder: path.dirname(apiPath) + '/' + path.dirname(typeObj.schemaPath)
                });
            }
        });

        return {
            title: api.title(),
            description: this.getHomepage(api.documentation()),
            version: api.version(),
            resources: this.parseResources(api.resources())
        };
    },

    parseResources (resources) {
        return resources.map((item) => {
            let description = item.description();
            if (checkIfGetterIsNeeded(description) ){
                description = description.value();
            }

            return {
                name: item.displayName(),
                description: description,
                url: item.completeRelativeUri(),
                parameters: item.absoluteUriParameters().map(this.parseTypeDeclaration, this),
                calls: item.methods().map(this.parseCall, this),
                children: this.parseResources(item.resources())
            };
        });
    },

    parseCall (call) {
        let description = call.description();
        if (checkIfGetterIsNeeded(description)) {
            description = description.value();
        }

        return {
            method: call.method().toUpperCase(),
            name: call.parentResource().completeRelativeUri(),
            description: description,
            query: call.queryParameters().map(this.parseTypeDeclaration),
            headers: getRequestHeaders(call, this.parseTypeDeclaration),
            responses: getRequestResponses(call, this.parseResponse.bind(this)),
            body: call.body().map((body) => {
                let description = body.description();
                let example = body.example();

                if (checkIfGetterIsNeeded(description)) {
                    description = description.value();
                }

                if (checkIfGetterIsNeeded(example)) {
                    example = example.value();
                }

                return {
                    name: body.name(),
                    description: description,
                    example: example
                }
            })
        };
    },

    parseResponse (response) {
        let description = response.description();
        if (checkIfGetterIsNeeded(description)) {
            description = description.value()
        }

        return {
            code: response.code().value(),
            description: description,
            headers: response.headers().map(this.parseTypeDeclaration),
            examples: response.body().map((body) => {
                let description = body.description();

                if (description) {
                    description = description.value()
                }

                return {
                    description: description,
                    body: body.example().value(),
                    jsonSchema: this.parseJsonSchema(body)
                }
            })
        }
    },

    parseJsonSchema (body) {
        let bodyType = body.type()[0];

        // TODO: Also check for JSON schema type
        if (typesMap[bodyType]) {
            return typesMap[bodyType];
        }

        return null;
    },

    parseTypeDeclaration (parameter) {
        let description = parameter.description(),
            example = parameter.example();

        if (checkIfGetterIsNeeded(description)) {
            description = description.value();
        }

        if (checkIfGetterIsNeeded(example)) {
            example = example.value();
        }

        return {
            name: parameter.name(),
            description: description,
            type: parameter.type(),
            example: example,
            required: parameter.required()
        }
    },

    getHomepage (descriptions) {
        let description = null;

        descriptions.forEach((desc) => {
            if (desc.title().toLowerCase() === 'home') {
                description = desc.content();
            }
        });

        if (checkIfGetterIsNeeded(description)) {
            description = description.value();
        }

        return description;
    }

};