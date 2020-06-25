'use strict';
var log = require('../logger');
var _ = require('lodash');

module.exports = function () {
    log.warn('Sending 404 response: ' + 'not found');
    this.status(404).json({ status: 'error', message: 'not found' });
};
