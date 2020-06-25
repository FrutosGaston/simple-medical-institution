'use strict';
var log = require('winston');
var config = require('../../config');

if (config.env === 'production') {
    log.add(log.transports.File, { filename: 'app-' + new Date().toDateString().split(' ').join('_') + '.log', level: 'warn' });
    log.remove(log.transports.Console);
}

module.exports = log;
