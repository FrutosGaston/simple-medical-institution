'use strict';

process.env.SECURE_MODE = true;

var chai = require('chai');
chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var res = {};
var req = {};

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

var logger = require('../../services/logger');
describe('#Logger service test', function () {
    it('should return an object', function (done) {
        logger.should.be.an('object');
        done();
    });

    it('should have property warn, error, info, verbose, debug, silly and log', function (done) {
        logger.should.be.have.property('warn');
        logger.should.be.have.property('error');
        logger.should.be.have.property('info');
        logger.should.be.have.property('log');
        logger.should.be.have.property('verbose');
        logger.should.be.have.property('debug');
        logger.should.be.have.property('silly');
        done();
    });
});
