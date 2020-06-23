'use strict';
var express = require('express');
var router = express.Router();
var response = require('../services/response');
var log = require('../services/logger');
var me = require('../package.json');
var config = require('../config');
var helmet = require('helmet');
var redisClient = require('../services/database').redis;
var limiter = require('express-limiter')(router, redisClient);
var _ = require('lodash');
var bodyParser = require('body-parser');
var cors = require('cors');
var hpp = require('hpp');
var contentLength = require('express-content-length-validator');
var MAX_CONTENT_LENGTH_ACCEPTED = config.maxContentLength * 1;
var fnv = require('fnv-plus');
var Cacheman = require('cacheman');
var EngineRedis = require('cacheman-redis');
var fileSystem = require('fs');
var shortId = require('shortid');
const nocache = require('nocache');

router._loadRoutes = function(routeFiles) {
    var versions = [];
    var ourRoutes = {};
    // Number of routes, removing index and initialize
    var currentRoute = 0;
    var routeNum = routeFiles.length * 1;

    // Comes with endpoint versioning
    routeFiles.forEach(function(file) {
        currentRoute = currentRoute + 1;
        var splitFileName = file.split('.');
        if(splitFileName[0] !== 'index' && splitFileName[0] !== 'initialize'){

            if(splitFileName.length === 3){
                ourRoutes[splitFileName[0]+'.'+splitFileName[1]] = require('./'+splitFileName[0]+'.'+splitFileName[1]);
                router.use('/'+splitFileName[1], ourRoutes[splitFileName[0]+'.'+splitFileName[1]]);
                var splitVersion = splitFileName[1].split('v');
                var versionMap = {};
                versionMap[splitFileName[0]] = splitVersion[1];
                versions.push(versionMap);
            }else{
                ourRoutes[splitFileName[0]] = require('./'+splitFileName[0]+'.'+splitFileName[1]);
                router.use('/', ourRoutes[splitFileName[0]]);
            }

        }
        if(currentRoute === routeNum){
            var finalVersions = {};
            _.forEach(versions, function(value){
                _.forOwn(value, function(value, key){
                    if(_.has(finalVersions, key)){
                        finalVersions[key].push(value);
                    }else{
                        finalVersions[key] = [];
                        finalVersions[key].push(value);
                    }
                });   
            });
            _.forOwn(finalVersions, function(value, key){
                var sorted = value.sort();
                var sortedlength = sorted.length * 1;
                router.use('/', ourRoutes[key+'.v'+sortedlength]);
            });
        } 
    });
    return ourRoutes;
};

router._APICache = function (req, res, next) {
    var cache = new EngineRedis(redisClient);
    var APICache = new Cacheman(me.name, { engine: cache, ttl: config.backendCacheExpiry });
    req.cache = APICache;
    // Tell Frontend to Cache responses
    res.set({'Cache-Control':'private, max-age='+config.frontendCacheExpiry+''});

    var key = [];
    key.push(req.url);
    key.push(req.ip);
    key.push(req.get('user-agent'));
    req.cacheKey = key;
    // Remember to delete cache when you get a POST call
    // Only cache GET calls
    if(req.method === 'GET'){
    //  if record is not in cache, set cache else get cache
        req.cache.get(req.cacheKey)
            .then(function(resp){
                if (!resp) {
                    // Will be set on successful response
                    next();
                } else {
                    res.ok(resp, true);
                }
            })
            .catch(function(err) {
                log.error('Failed to get cached data: ', err);
                // Don't block the call because of this failure.
                next();
            });
    }else{
        if(req.method === 'POST' || req.method === 'PUT' || req.method === 'PUSH' || req.method === 'PATCH' || req.method === 'DELETE'){
            req.cache.del(req.cacheKey)
                .then(function(res){})
                .catch(function(err){
                    log.error('Failed to delete cached data: ', err);
                    // Don't block the call because of this failure.
                }); // No delays
        }
        next();
    }

};

router.use(helmet());
router.use(cors());
router.options('*', cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.raw({limit: '50mb'}));
router.use(bodyParser.text({limit: '50mb'}));
router.use(bodyParser.json());
router.use(bodyParser.raw());
router.use(bodyParser.text());

// Log requests here
router.use(function (req, res, next) {
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
});
// load response handlers
router.use(response);
// Watch for encrypted requests
router.use(hpp());
router.use(contentLength.validateMax({max: MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: 'Stop! Maximum content length exceeded.'})); // max size accepted for the content-length

// API Rate limiter
limiter({
    path: '*',
    method: 'all',
    lookup: ['ip','accountId','appId','developer'],
    total: config.rateLimit * 1,
    expire: config.rateLimitExpiry * 1,
    onRateLimited: function (req, res, next) {
        next({ message: 'Rate limit exceeded', statusCode: 429 });
    }
});

// no client side caching
if (config.noFrontendCaching === 'yes') {
    router.use(nocache());
} else {
    router.use(router._APICache);
}

router.get('/', function (req, res) {
    res.ok({name: me.name, version: me.version});
});

// Let's Encrypt Setup
router.get(config.letsencryptSSLVerificationURL, function(req,res){
    res.send(config.letsencryptSSLVerificationBody);
});

// Publicly available routes here, IE. routes that should work with out requiring userid, appid and developer.

// Should automatically load routes
// Other routes here

var normalizedPath = require('path').join(__dirname, './');
var routeFiles = fileSystem.readdirSync(normalizedPath);

router._loadRoutes(routeFiles);

// Finished loading routes

router.use(function(req, res, next) { // jshint ignore:line
    res.notFound();
});

router.use(log.errorHandler);

module.exports = router;
