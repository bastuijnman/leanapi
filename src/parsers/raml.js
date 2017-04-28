'use strict';

let parser = require('raml-1-parser');
let path = require('path');

const checkIfGetterIsNeeded = function (checkParam) {
    return checkParam && typeof checkParam === 'object';
};

module.exports = {

    parse (apiPath) {
        let api = parser.loadApiSync(apiPath).expand();

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
                parameters: item.absoluteUriParameters().map(this.parseParameter, this),
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
            query: call.queryParameters().map(this.parseParameter),
            responses: call.responses().map(this.parseResponse, this),
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
            examples: response.body().map((body) => {
                let description = body.description(),
                    jsonSchemaContent = body.toJSON().schemaContent;

                if (description) {
                    description = description.value()
                }

                /*
                 * Very hacky way to identify whether we have a JSON schema
                 * TODO: rework this
                 */
                if (jsonSchemaContent && jsonSchemaContent.indexOf('json-schema.org') < 0) {
                    jsonSchemaContent = null;
                }

                return {
                    description: description,
                    body: body.example().value(),
                    jsonSchema: jsonSchemaContent
                }
            })
        }
    },

    parseParameter (parameter) {
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