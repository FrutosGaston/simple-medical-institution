'use strict';
/* eslint-env mocha */

var chai = require('chai');
chai.should();
var sinon = require('sinon');
var q = require('q');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Client = require('../../models/Clients');

describe('Client Model',function(){

    var client;

    beforeEach((done) => {
        client = new Client({  firstName: 'Ellen' });
        client.save().then(() => done());
    });

    describe('Test CRUDS', function() {
        it('should save data', function(done){
            var myclient = Client.create({firstName: 'femi'});

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should read data', function(done){
            var myclient = Client.findOne({_id: client._id});

            myclient.then(function (res) {
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should read all data', function(done){
            var myclient = Client.find();

            myclient.then(function(res){
                res.should.be.an.array; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it ('should update data', function(done) {
            const newName = 'Olaoluwa';

            Client.findByIdAndUpdate(client._id, { firstName: newName })
                .then(function(res) {
                    return Client.findById(client._id);
                })
                .then(function(res){
                    res.should.have.property('updatedAt');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });

        it('should add createdAt', function(done){
            const myclient = Client.create({firstName: 'this is for the gods'});

            myclient.then(function(res){
                res.should.have.property('createdAt');
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it ('should add updatedAt', function(done) {
            const newName = 'newName';

            Client.findByIdAndUpdate(client._id,{ firstName: newName })
                .then(function(res) {
                    return Client.findById(client._id);
                })
                .then(function(res){
                    res.should.have.property('updatedAt');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });

        it ('should count returned records', function(done) {
            var myclient = Client.estimatedDocumentCount({firstName: 'This is the titan'});

            myclient.then(function(res){
                res.should.be.a.number; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find a record by id', function(done){
            var myclient = Client.findById(client._id);

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it ('should find a record by id and delete', function(done) {
            var myclient = Client.findByIdAndRemove(client._id);

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

    });
});
