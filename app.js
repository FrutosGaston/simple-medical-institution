'use strict';

var config = require('./config');
var log = require('./services/logger');
var express = require('express');
var app;
var server;

app = express();
var router = require('./routes');
var expressEnforcesSsl = require('express-enforces-ssl');

if (config.enforceSSL === 'yes') {
    app.use(expressEnforcesSsl());
}

app.use('/', router);

server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;
    log.info('API server listening on host ' + host + ', port ' + port + '!');
});
