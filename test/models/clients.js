'use strict';
/* eslint-env mocha */

var chai = require('chai');
chai.should();
var sinon = require('sinon');
var q = require('q');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Client = require('../../models/Clients');

describe('Client Model', function () {
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

    let client;
    beforeEach((done) => {
        client = new Client(clientBody);
        client.save().then(() => done());
    });

    describe('Test CRUDS', function () {
        it('should save data', function (done) {
            var myclient = Client.create(clientBody);

            myclient.then(function (res) {
                res.firstName.should.be.eql(clientBody.firstName);
                done();
            })
                .catch(function (err) {
                    done(err);
                });
        });

        it('should read data', function (done) {
            var myclient = Client.findOne({ _id: client.id });

            myclient.then(function (res) {
                res.firstName.should.be.eql(client.firstName);
                done();
            })
                .catch(function (err) {
                    done(err);
                });
        });

        it('should update data', function (done) {
            const newName = 'Olaoluwa';

            Client.findByIdAndUpdate(client._id, { firstName: newName })
                .then(function (res) {
                    return Client.findById(client._id);
                })
                .then(function (res) {
                    res.should.have.property('updatedAt');
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });

        it('should add createdAt', function (done) {
            const myclient = Client.create(clientBody);

            myclient.then(function (res) {
                res.should.have.property('createdAt');
                done();
            })
                .catch(function (err) {
                    done(err);
                });
        });

        it('should add updatedAt', function (done) {
            const newName = 'newName';

            Client.findByIdAndUpdate(client._id, { firstName: newName })
                .then(function (res) {
                    return Client.findById(client._id);
                })
                .then(function (res) {
                    res.should.have.property('updatedAt');
                    done();
                })
                .catch(function (err) {
                    done(err);
                });
        });

        it('should find a record by id', function (done) {
            var myclient = Client.findById(client._id);

            myclient.then(function (res) {
                res.should.be.an.object;
                done();
            })
                .catch(function (err) {
                    done(err);
                });
        });

        it('should find a record by id and delete', function (done) {
            var myclient = Client.findByIdAndRemove(client._id);

            myclient.then(function (res) {
                res.should.be.an.object;
                done();
            })
                .catch(function (err) {
                    done(err);
                });
        });
    });
});
