'use strict';
var log = require('winston');
var config = require('../../config');
var response = require('../response');

if (config.env === 'production') {
    log.add(log.transports.File, { filename: 'app-' + new Date().toDateString().split(' ').join('_') + '.log', level: 'warn' });
    log.remove(log.transports.Console);
}

module.exports = log;
module.exports.errorHandler = function(err, req, res, next) { // jshint ignore:line
    response(req, res, next);
    log.error(err);
    if (err.statusCode === 404) {
        res.notFound(err);
    }
    else if (err.statusCode === 401) {
        res.unauthorized(err);
    }
    else if (err.statusCode === 400) {
        res.badRequest(err);
    }
    else if (err.statusCode === 403) {
        res.forbidden(err);
    }
    else if (err.statusCode === 422) {
        res.unprocessable(err);
    }
    else {
        res.serverError(err);
    }
};
