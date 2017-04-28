'use strict';

const browserify = require('browserify');
const browserifyCssx = require('browserify-cssx');
const browserifyCss = require('browserify-css');
const babelify = require('babelify');

module.exports = {

    /**
     * Bundles javascript through browserify and returns
     * it in a Stream format.
     *
     * @param {string} filename - The javascript file you want to bundle.
     * @returns {fs.ReadStream} - The read file stream.
     */
    getJsBuildStream: function (filename) {
        return browserify(filename, {
            noParse: [
                require.resolve(__dirname + '/../node_modules/json-schema-view-js/bower_components/json-formatter-js/dist/bundle.js'),
                require.resolve(__dirname + '/../node_modules/json-schema-view-js/dist/bundle.min.js')
            ]
        })
            .require([
                require.resolve(__dirname + '/../node_modules/json-schema-view-js/bower_components/json-formatter-js/dist/bundle.js'),
                require.resolve(__dirname + '/../node_modules/json-schema-view-js/dist/bundle.min.js')
            ])
            .transform(browserifyCss)
            .transform(browserifyCssx)
            .transform(babelify, {
                presets: ['es2015', 'react']
            })
            .bundle();
    }

};