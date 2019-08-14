'use strict';

const amf = require('./parsers/amf');
const path = require('path');
const fs = require('fs');

module.exports = function (apiPath) {
    
    // Always parse raml extensions through AMF parser (expected raml) 
    if (path.extname(apiPath) === '.raml') {
        return amf.parse(apiPath, amf.SUPPORTED_PARSERS.RAML10);
    }

    if (path.extname(apiPath) === '.json') {
        const contents = JSON.parse(fs.readFileSync(apiPath));

        if (contents && contents.swagger === '2.0') {
            return amf.parse(apiPath, amf.SUPPORTED_PARSERS.OAS20);
        }
    }

    throw new Error('Trying to parse unsupported API format');
};