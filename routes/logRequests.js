'use strict';

const log = require('../services/logger');
const fnv = require('fnv-plus');
const shortId = require('shortid');

const logRequests = function (req, res, next) {
    var ipAddress = req.ip;
    req.requestId = fnv.hash(shortId.generate() + Math.floor(100000 + Math.random() * 900000) + '' + Date.now() + '' + ipAddress, 128).str();
    res.set('X-Request-Id', req.requestId);

    var reqLog = {
        RequestId: req.requestId,
        ipAddress: ipAddress,
        url: req.url,
        method: req.method,
        body: req.body,
        device: req.get('user-agent'),
        createdAt: new Date()
    };

    log.info(reqLog);
    next();
};

module.exports = logRequests;
