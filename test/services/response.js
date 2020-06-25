'use strict';

var chai = require('chai');
chai.should();
var config = require('../../config');
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

var response = require('../../services/response');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('supertest');
var router = require('../../routes');
const apiCache = require('../../routes/cache');

// Dummy App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(response);
app.use(apiCache);

app.get('/ok', function (req, res) {
    res.ok('It worked!');
});

app.get('/badRequest', function (req, res) {
    res.badRequest('It worked!');
});

app.get('/forbidden', function (req, res) {
    res.forbidden('It worked!');
});

app.get('/notFound', function (req, res) {
    res.notFound('It worked!');
});

app.get('/serverError', function (req, res) {
    res.serverError('It worked!');
});

app.get('/unauthorized', function (req, res) {
    res.unauthorized('It worked!');
});

app.get('/unprocessable', function (req, res) {
    res.unprocessable('It worked!');
});

var app2 = express();

// Dummy App
app2.use(bodyParser.urlencoded({ extended: false }));
app2.use(bodyParser.json());
app2.use(response);

app2.post('/secure', function (req, res) {
    res.ok('It worked!');
});

var agent = request(app);

var agent2 = request(app2);

// Testing response service

describe('#Response service test', function () {
    it('should add property ok, badRequest, forbidden, notFound, serverError and unauthorized to res object', function (done) {
        response(req, res, next);
        nextChecker = false;
        res.should.have.property('ok');
        res.should.have.property('badRequest');
        res.should.have.property('forbidden');
        res.should.have.property('notFound');
        res.should.have.property('serverError');
        res.should.have.property('unauthorized');
        res.should.have.property('unprocessable');
        done();
    });

    it('should be ok', function (done) {
        agent
            .get('/ok')
            .expect(200, done);
    });

    console.log(process.env.NO_CACHE);
    if (config.noFrontendCaching !== 'yes') {
        it('should be a cached response', function (done) {
            agent
                .get('/ok')
                .expect(200)
                .then(function (res) {
                    console.log(res.body);
                    res.body.cached.should.be.true;
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });
    }

    it('should be a badRequest', function (done) {
        agent
            .get('/badRequest')
            .expect(400, done);
    });
    it('should be forbidden', function (done) {
        agent
            .get('/forbidden')
            .expect(403, done);
    });
    it('should not be found', function (done) {
        agent
            .get('/notFound')
            .expect(404, done);
    });
    it('should be unauthorized', function (done) {
        agent
            .get('/unauthorized')
            .expect(401, done);
    });
    it('should be a serverError', function (done) {
        agent
            .get('/serverError')
            .expect(500, done);
    });
    it('should be an unprocessable entity response', function (done) {
        agent
            .get('/unprocessable')
            .expect(422, done);
    });
});
