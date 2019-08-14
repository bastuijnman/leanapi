'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const build = require('./build');
const parser = require('./parser');
const port = 9876;

module.exports = function (opts = {}) {

    let responses;

    const handleRequest = (request, response) => {
        let url = request.url;

        /*
         * Horrible way to handle the resources that we need, we'll
         * need to rethink this.
         */
        switch (url) {

            case '/api.json':
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(responses.api));
                break;

            case '/app.build.js':
                response.setHeader('Content-Type', 'application/javascript; charset=utf-8');

                // Sucky cache mechanism, try to rework
                if (typeof responses.js === 'string') {
                    response.end(responses.js);
                } else {
                    responses.js.pipe(response);
                }
                break;

            default:
                response.setHeader('Content-Type', 'text/html');
                response.end(responses.index);
                break;
        }

    };

    const server = http.createServer(handleRequest);
    const io = socketIO(server);

    server.listen(opts.port || port, async (err) => {
        if (err) {
            console.log('Something went wrong when trying to start the LeanAPI server');
            process.exit(1);
        }

        console.log(`LeanAPI server is listening on port ${server.address().port}`);

        let api;
        try {
            api = await parser(opts.apiPath);
        } catch (e) {
            console.error(e);
            process.exit(1);
        }

        responses = {
            api,
            index: fs.readFileSync(__dirname + '/frontend/index.server.html'),
            js: build.getJsBuildStream(__dirname + '/frontend/app.js')
        };

        let cachedJsResponse = '';
        responses.js.on('data' , (chunk) => {
            cachedJsResponse += chunk;
        }).on('end', () => {
            responses.js = cachedJsResponse;
        });
    });

    fs.watch(path.dirname(opts.apiPath), {
        persistent: true,
        recursive: true
    }, async () => {
        let api = await parser(opts.apiPath);
        io.emit('changed', api);

        // Update our cached response value
        responses.api = api;
    });

    return server;

}