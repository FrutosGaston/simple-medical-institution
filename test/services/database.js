'use strict';

process.env.SECURE_MODE = true;

var chai = require('chai');
chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// init

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
res.json = function (data) {
    return res;
};

res.status = function (status) {
    return res;
};

var header = {};
res.set = function (key, value) {
    header[key] = value;
    return header[key];
};
req.get = function (key) {
    return header[key];
};

header.set = function (data) {
    header.temp = data;
    return header.temp;
};

req.method = '';

// Testing database service

var databases = require('../../services/database');
describe('#Database Service test', function () {
    it('should return an object', function (done) {
        databases.should.be.an('object');
        done();
    });
});

var mongodb = require('../../services/database').mongo;

describe('#MongoDB database service test', function () {
    it('should exist as a function', function (done) {
        mongodb.should.exist;
        done();
    });
});

var redisdb = require('../../services/database').redis;

describe('#Redis database service test', function () {
    it('should exist as a function', function (done) {
        redisdb.should.exist;
        done();
    });
});
