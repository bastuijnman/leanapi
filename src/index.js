#!/usr/bin/env node
'use strict';

let app = require('commander');
let parser = require('./parser');
let path = require('path');
let mkdirp = require('mkdirp');
let fs = require('fs');
let server = require('./server');
let build = require('./build');

app
    .version('2.0.0')
    .usage('[options] <file>')
    .option('-o, --output <path>', 'The output folder', './api-docs')
    .option('-s, --serve', 'Whether you want to serve dynamically instead of building', false)
    .option('-p, --port [number]', 'Which port you want to use for the dynamic server')
    .parse(process.argv);

if (process.argv.length <= 2) {
    app.outputHelp();
    process.exit(0);
}

let apiPath = path.resolve(process.cwd(), app.args[0]);

if (app.serve) {
    return server({
        apiPath: apiPath,
        port: app.port
    });
}

let outputPath = path.resolve(process.cwd(), app.output);
let result = parser(apiPath);

mkdirp(outputPath, function (err) {
    if (err) {
        throw new Error('Error while creating output path: ' + err.message);
    }

    // Copy index
    fs
        .createReadStream(__dirname + '/frontend/index.html')
        .pipe(fs.createWriteStream(outputPath + '/index.html'));

    // Copy API files
    fs.open(outputPath + '/api.json', 'w', (err, handle) => {
        if (err) {
            throw new Error('Error while creating API file handle');
        }
        fs.write(handle, JSON.stringify(result), function (err) {
            if (err) {
                throw new Error('Error while createing API file');
            }
        });
    });

    // Build app JS
    build
        .getJsBuildStream(__dirname + '/frontend/app.js')
        .pipe(fs.createWriteStream(outputPath + '/app.build.js'));

});