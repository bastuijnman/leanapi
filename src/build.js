'use strict';

const browserify = require('browserify');
const browserifyCssx = require('browserify-cssx');
const browserifyCss = require('browserify-css');
const babelify = require('babelify');
const path = require('path');

module.exports = {

    /**
     * Bundles javascript through browserify and returns
     * it in a Stream format.
     *
     * @param {string} filename - The javascript file you want to bundle.
     * @returns {fs.ReadStream} - The read file stream.
     */
    getJsBuildStream: function (filename) {
        return browserify({
                entries: [
                    filename
                ],
                noParse: [
                    path.resolve('./node_modules/json-schema-view-js/bower_components/json-formatter-js/dist/bundle.js'),
                    path.resolve('./node_modules/json-schema-view-js/dist/bundle.js')
                ]
            })
            .transform('browserify-css')
            .transform('browserify-cssx')
            .transform('babelify', {
                presets: ['es2015', 'react']
            })
            .require('./node_modules/json-schema-view-js/bower_components/json-formatter-js/dist/bundle.js', {
                expose: 'JSONFormatter'
            })
            .require('./node_modules/json-schema-view-js/dist/bundle.js', {
                expose: 'JSONSchemaView'
            })
            .bundle();
    }

};