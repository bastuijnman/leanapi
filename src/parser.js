'use strict';

let raml = require('./parsers/raml');
let path = require('path');

module.exports = function (apiPath) {
    if (path.extname(apiPath) === '.raml') {
        return raml.parse(apiPath);
    }

    throw new Error('Trying to parse unsupported API format');
};