'use strict';

process.env.RATE_LIMIT = 10;
var chai = require('chai');
chai.should();
var config = require('../../config');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var request = require('supertest');
var router = require('../../routes');
var express = require('express');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var app4 = express();

app4.use('/',router);


var agent4 = request.agent(app4);
var requestId;

var res = {};
var req = {};

var nextChecker = false;    
var next = function(){
    if(arguments.length > 0){
        console.log(arguments[0]);
    }else{
        nextChecker = true;
    }
    
    return nextChecker;
};
res.json = function(data){
    return res;
};

res.badRequest = sinon.spy();

res.status = function(status){
    return res;
};

var header = {};
res.set = function(key, value){
    header[key] = value;
    return header[key];
};
req.get = function(key){
    return header[key];
};

header.set = function(data){
    header.temp = data;
    return header.temp;
};

req.method = '';

describe('Router', function(){

    it('should contain a param function', function(done){
        router._allRequestData(req, res, next);
        nextChecker.should.be.true; /* jslint ignore:line */
        nextChecker = false;
        req.param.should.be.a('function');
        done();
    });

});


describe('Cache Test', function(){
    it('should initialize the API cache', function(done){
        res.set = sinon.spy();
        router._APICache(req, res, next);
        nextChecker.should.be.true; /* jslint ignore:line */
        nextChecker = false;
        req.cache.should.be.a('object');
        req.cacheKey.should.be.a('array');
        res.set.should.be.called.once; /* jslint ignore:line */
        res.set.should.be.calledWith({'Cache-Control':'private, max-age='+config.frontendCacheExpiry+''});
        done();
    });
});
