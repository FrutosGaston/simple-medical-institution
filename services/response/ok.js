'use strict';
var log = require('../logger');
var config = require('../../config');
var debug = require('debug')('response');
var _ = require('lodash');

module.exports = function (data, cache, extraData) {
    debug('sending ok response');
    var req = this.req;
    var res = this;

    var response = {};
    if (cache) {
        response.response = data;
        response.response.cached = cache;
    } else {
        response.response = { status: 'success', data: data };
    }
    
    response.requestId = req.requestId;
    log.info('Sending ok response: ', response.response);
    if (data) {
        // Only cache GET calls
        if (req.method === 'GET' && config.noFrontendCaching !== 'yes') {

            // If this is a cached response, show response else cache the response and show response.
            if(cache){
                res.status(200).json(response.response);
            } else {
                req.cache.set(req.cacheKey, response.response)
                    .then(function(resp){
                        res.status(200).json(response.response);
                    })
                    .catch(function(err){
                        log.error('Failed to cache data: ', err);
                        res.status(200).json(response.response);
                    });
            }
        } else {
            res.status(200).json(response.response);
        }
    } else {
        res.status(200).json(response.response);
    }

};
