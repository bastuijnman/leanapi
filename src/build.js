'use strict';

const webpack = require('webpack');
const { Readable } = require('stream');
const Progress = require('progress');

const MemoryFS = require('memory-fs');
const fs = new MemoryFS();

module.exports = {

    /**
     * Gets a readable stream which builds the client JS through webpack.
     *
     * @param {String} filename - The file name of the client.
     */
    getJsBuildStream: function (filename) {

        const readable = new Readable();
        const bar = new Progress('Building [:bar] :percent', {
            total: 40,
            renderThrottle: 0
        });
        let lastPercent = 0;

        const compiler = webpack({
            context: __dirname,
            entry: filename,
            output: {
                filename: 'app.dist.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    require.resolve('@babel/preset-env'),
                                    require.resolve('@babel/preset-react')
                                ]
                            }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: [ 'style-loader', 'css-loader' ]
                    }
                ]
            },
            plugins: [
                new webpack.ProgressPlugin(percent => {

                    const newPercent = Math.ceil(percent * 100);
                    if (newPercent > lastPercent) {
                        bar.update(percent);
                        lastPercent = newPercent;
                    }
                })
            ]
        });

        compiler.outputFileSystem = fs;
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                throw new Error('Error while trying to create client JS');
            }

            readable.push(stats.compilation.assets['app.dist.js'].source());
            readable.emit('end');
        });

        // Implement actual read function
        readable._read = () => {

        }

        return readable;
    }

};