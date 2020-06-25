'use strict';

var chai = require('chai');
chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var clients = require('../../controllers/Clients.js');
var _ = require('lodash');
var db = require('../../models');
var Client = require('../../models/Clients');

var from = new Date(new Date().setMinutes(new Date().getMinutes() - 3)).toISOString();
describe('Clients controller', function () {
    const clientBody = {
        firstName: 'Ellen',
        lastName: 'Ross',
        gender: 'Female',
        martialStatus: 'Married',
        religiousAffiliation: 'Christian',
        ethnicity: 'Asian',
        languageSpoken: 'English',
        address: { streetNumber: '17', street: 'Daws Road', city: 'Portland', state: 'OR', zip: '97006' },
        telephone: '415-555-1229',
        birthday: 'March 7, 1960',
        guardian: {
            role: 'Sister',
            firstName: 'Martha',
            lastName: 'Shan',
            address: { streetNumber: '17', street: 'Daws Road', city: 'Portland', state: 'OR', zip: '97006' },
            telephone: '816-276-6909'
        },
        immunizations: [],
        allergies: [],
        provider: '5ef3bb60d4111b4b27f8bf83'
    };

    it('should create a client', function (done) {
        const clientFirstName = 'Ana';

        const next = function (err) { done(err); };
        const res = {};
        res.ok = function (data, cache, extraData) {
            data.firstName.should.be.eql(clientFirstName);
            done();
        };

        const req = {};
        req.body = clientBody;
        req.body.firstName = clientFirstName;
        clients.create(req, res, next);
    });

    it('should search for matching clients for a given first name', function (done) {
        const client1 = new Client(clientBody);
        client1.save().then((savedClient) => {
            var next = function (err) {
                done(err);
            };
            var res = {};
            res.ok = function (data, cache, extraData) {
                data.resp.length.should.be.eql(1);
                done();
            };
            var req = {};
            req.query = {};
            req.query._id = savedClient.id;
            req.query.firstName = savedClient.firstName;
            clients.find(req, res, next);
        });
    });

    it('should find one document', function (done) {
        const client1 = new Client(clientBody);
        client1.save().then((savedClient) => {
            var next = function (err) {
                done(err);
            };
            var res = {};
            res.ok = function (data, cache, extraData) {
                data.firstName.should.be.eql(savedClient.firstName);
                done();
            };
            var req = {};
            req.params = {};
            req.params.id = savedClient.id;
            clients.findOne(req, res, next);
        });
    });

    it('should update a document', function (done) {
        const newName = 'Mr Fufu';
        const client1 = new Client(clientBody);
        client1.save().then((savedClient) => {
            var next = function (err) { done(err); };
            var res = {};
            res.ok = function (data, cache, extraData) { done(); };
            var req = {};
            req.params = {};
            req.params.id = savedClient.id;
            req.body = { firstName: newName };

            clients.updateOne(req, res, next);

            clients.findOne({ params: { id: savedClient.id } })
                .then(function (data, cache, extraData) {
                    data.firstName.should.eql(newName);
                });
        });
    });
});
