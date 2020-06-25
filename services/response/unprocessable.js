'use strict';
var log = require('../logger');
var _ = require('lodash');

module.exports = function (data, message) {
    log.warn('Sending unprocessable entity response: ', data, message || 'unprocessable entity');

    if (data !== undefined && data !== null) {
        if (Object.keys(data).length === 0 && JSON.stringify(data) === JSON.stringify({})) {
            data = data.toString();
        }
    }

    if (data) {
        this.status(422).json({ status: 'error', data: data, message: message || 'unprocessable entity' });
    } else {
        this.status(422).json({ status: 'error', message: message || 'unprocessable entity' });
    }
};
