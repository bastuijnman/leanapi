/**
 * Transforms a JSON Schema object to a LeanAPI (simplified schema object)
 * @param {string|Object} schema - The JSON schema object
 */
const transformJsonSchema = (schema) => {

    // If schema is a string make sure we parse it to an object
    if (typeof schema === 'string') {
        schema = JSON.parse(schema);
    }
     
    // If a top level ref is given follow that.
    if (schema.$ref) {
        const path = schema.$ref.split('/');
        // Parse only with root
        if (path[0] === '#') {
            path.shift();
            for (const ref of path) {
                schema = schema[ref];
            }
        }
    }

    const { properties, required = [] } = schema;
    if (properties) {
        return Object.keys(properties).map(property => {
            const values = properties[property];

            return {
                name: property,
                description: values.description,
                type: values.type,
                required: !!required.find(r => r === property)
            };
        });
    }

    return [];
}

module.exports = transformJsonSchema;