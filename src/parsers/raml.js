'use strict';

let parser = require('raml-1-parser');
let path = require('path');

module.exports = {

    parse () {
        let api = parser.loadApiSync(path.resolve(__dirname, '../../../smart-ott-api/spec/api.raml'));

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
            if (description) {
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
        if (description) {
            description = description.value();
        }

        return {
            method: call.method().toUpperCase(),
            name: call.parentResource().completeRelativeUri(),
            description: description,
            responses: call.responses().map(this.parseResponse, this),
            body: call.body().map((body) => {
                let description = body.description();
                let example = body.example();

                if (description) {
                    description = description.value();
                }

                if (example) {
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
        if (description) {
            description = description.value()
        }

        return {
            code: response.code().value(),
            description: description,
            examples: response.body().map((body) => {
                let description = body.description();
                if (description) {
                    description = description.value()
                }

                return {
                    description: description,
                    body: body.example().value()
                }
            })
        }
    },

    parseParameter (parameter) {
        let description = parameter.description();
        if (description) {
            description = description.value();
        }

        return {
            name: parameter.name(),
            description: description,
            type: parameter.type(),
            example: parameter.example(),
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

        if (description) {
            description = description.value();
        }

        return description;
    }

};