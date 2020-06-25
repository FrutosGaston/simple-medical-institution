'use strict';

const Cacheman = require('cacheman');
const EngineRedis = require('cacheman-redis');
const redisClient = require('../services/database').redis;
const log = require('../services/logger');
const me = require('../package.json');
const config = require('../config');

const dataModifierMethods = ['POST', 'PUT', 'PUSH', 'PATCH', 'DELETE'];

const keyForUrl = (url, req) => {
    const key = [];
    key.push(url);
    key.push(req.ip);
    key.push(req.get('user-agent'));
    return key;
};

const getCacheKeysToClear = (req) => {
    const urlPathParts = req.url.split('/').slice(1);
    return urlPathParts.reduce((acum, current) => {
        const lastKey = acum.slice(-1)[0];
        const lastUrl = lastKey[0];
        acum.push(keyForUrl(lastUrl + '/' + current, req));
        return acum;
    }, [['']]).slice(1);
};

const clearCacheForKeys = (req) => {
    req.cacheKeysToClear.forEach((key) =>
        req.cache.del(key)
            .then(function (res) {})
            .catch(function (err) {
                log.error('Failed to delete cached data: ', err);
            })
    );
};

const apiCache = function (req, res, next) {
    const cache = new EngineRedis(redisClient);
    const APICache = new Cacheman(me.name, { engine: cache, ttl: config.backendCacheExpiry });
    req.cache = APICache;
    res.set({ 'Cache-Control': 'private, max-age=' + config.frontendCacheExpiry + '' });

    req.cacheKey = keyForUrl(req.url, req);
    req.cacheKeysToClear = getCacheKeysToClear(req);

    if (req.method === 'GET') {
        req.cache.get(req.cacheKey)
            .then(function (resp) {
                if (!resp) {
                    next();
                } else {
                    res.ok(resp, true);
                }
            })
            .catch(function (err) {
                log.error('Failed to get cached data: ', err);
                next();
            });
    } else {
        if (dataModifierMethods.includes(req.method)) {
            clearCacheForKeys(req);
        }
        next();
    }
};

module.exports = apiCache;
