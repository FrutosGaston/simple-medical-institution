'use strict';

process.env.RATE_LIMIT = 10;
var chai = require('chai');
chai.should();
var config = require('../../config');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var router = require('../../routes');
var express = require('express');
const apiCache = require('../../routes/cache');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var app4 = express();
app4.use('/', router);

var res = {};
var req = {};

var nextChecker = false;
var next = function () {
    if (arguments.length > 0) {
        console.log(arguments[0]);
    } else {
        nextChecker = true;
    }
    return nextChecker;
};

var header = {};

req.get = function (key) {
    return header[key];
};

describe('Cache Test', function () {
    it('should initialize the API cache', function (done) {
        res.set = sinon.spy();
        req.url = '';
        apiCache(req, res, next);
        nextChecker.should.be.true;
        nextChecker = false;
        req.cache.should.be.a('object');
        req.cacheKey.should.be.a('array');
        res.set.should.be.called.once;
        res.set.should.be.calledWith({ 'Cache-Control': 'private, max-age=' + config.frontendCacheExpiry + '' });
        done();
    });
});
