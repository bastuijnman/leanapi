'use strict';

const browserify = require('browserify');
const browserifyCssx = require('browserify-cssx');
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
        return browserify(filename)
            .transform(browserifyCssx)
            .transform(babelify, {
                presets: ['es2015', 'react']
            })
            .bundle();
    }

};