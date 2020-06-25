'use strict';

var express = require('express');
var router = express.Router();
var response = require('../services/response');
var me = require('../package.json');
var config = require('../config');
var helmet = require('helmet');
var redisClient = require('../services/database').redis;
var limiter = require('express-limiter')(router, redisClient);
var bodyParser = require('body-parser');
var cors = require('cors');
var hpp = require('hpp');
var contentLength = require('express-content-length-validator');
var MAX_CONTENT_LENGTH_ACCEPTED = config.maxContentLength * 1;
const fileSystem = require('fs');
const nocache = require('nocache');
const errorHandler = require('../services/response/errorHandler');
const apiCache = require('./cache');
const logRequests = require('./logRequests');
const _ = require('lodash');

router._loadRoutes = function (routeFiles) {
    var versions = [];
    var ourRoutes = {};
    var currentRoute = 0;
    var routeNum = routeFiles.length * 1;

    // Comes with endpoint versioning
    routeFiles.forEach(function (file) {
        currentRoute = currentRoute + 1;
        var splitFileName = file.split('.');
        if (splitFileName[0] !== 'index') {
            if (splitFileName.length === 3) {
                ourRoutes[splitFileName[0] + '.' + splitFileName[1]] = require('./' + splitFileName[0] + '.' + splitFileName[1]);
                router.use('/' + splitFileName[1], ourRoutes[splitFileName[0] + '.' + splitFileName[1]]);
                var splitVersion = splitFileName[1].split('v');
                var versionMap = {};
                versionMap[splitFileName[0]] = splitVersion[1];
                versions.push(versionMap);
            } else {
                ourRoutes[splitFileName[0]] = require('./' + splitFileName[0] + '.' + splitFileName[1]);
                router.use('/', ourRoutes[splitFileName[0]]);
            }
        }
        if (currentRoute === routeNum) {
            var finalVersions = {};
            _.forEach(versions, function (value) {
                _.forOwn(value, function (value, key) {
                    if (_.has(finalVersions, key)) {
                        finalVersions[key].push(value);
                    } else {
                        finalVersions[key] = [];
                        finalVersions[key].push(value);
                    }
                });
            });
            _.forOwn(finalVersions, function (value, key) {
                var sorted = value.sort();
                var sortedlength = sorted.length * 1;
                router.use('/', ourRoutes[key + '.v' + sortedlength]);
            });
        }
    });
    return ourRoutes;
};

router.use(helmet());
router.use(cors());
router.options('*', cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.raw({ limit: '50mb' }));
router.use(bodyParser.text({ limit: '50mb' }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
router.use(bodyParser.text());

// Log requests here
router.use(logRequests);
router.use(response);
router.use(hpp());
router.use(contentLength.validateMax({ max: MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: 'Stop! Maximum content length exceeded.' })); // max size accepted for the content-length

// API Rate limiter
limiter({
    path: '*',
    method: 'all',
    lookup: ['ip', 'accountId', 'appId', 'developer'],
    total: config.rateLimit * 1,
    expire: config.rateLimitExpiry * 1,
    onRateLimited: function (req, res, next) {
        next({ message: 'Rate limit exceeded', statusCode: 429 });
    }
});

if (config.noFrontendCaching === 'yes') {
    router.use(nocache());
} else {
    router.use(apiCache);
}

router.get('/', function (req, res) {
    res.ok({ name: me.name, version: me.version });
});

var normalizedPath = require('path').join(__dirname, './');
var routeFiles = fileSystem.readdirSync(normalizedPath);

router._loadRoutes(routeFiles);

router.use(function (req, res, next) { // jshint ignore:line
    res.notFound();
});

router.use(errorHandler);

module.exports = router;
