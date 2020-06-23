'use strict';

var chai = require('chai');
chai.should();
var config = require('../../config');
var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
var mongooseMock = require('mongoose-mock');
// var expect = chai.expect;
var sinon = require('sinon');
var q = require('q');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Client;
// Testing The Client Model
describe('Client Model',function(){

    var id;
    var id2;

    describe('Test CRUDS', function(){
        it('should save data', function(done){
            var myclient = Client.create({name: 'femi'});

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should read data', function(done){
            var myclient = Client.findOne({name: 'femi'});

            myclient.then(function(res){
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

        it('should update data', function(done){
            var cb = sinon.spy();
            var myclient = Client.updateMany({name: 'femi'},{name: 'Olaoluwa'});

            myclient.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should update many data', function(done){
            var cb = sinon.spy();
            var myclient = Client.updateMany({name: 'femi'},{name: 'Olaoluwa Olanipekun'});

            myclient.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should search data', function(done){
            // Search needs more work for more accuracy
            var myclient = Client.search('femi');

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should delete data', function(done){
            var cb2 = sinon.spy();
            var ourclient = Client.create([{name:'Olaolu'},{name: 'fola'},{name: 'bolu'}]);

            ourclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                return Client.deleteOne({name: 'bolu'});
            }).then(function(res){
                cb2();
                cb2.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should delete many data', function(done){
            var cb = sinon.spy();
            var myclient = Client.deleteMany({name: 'femi'});

            myclient.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should add createdAt', function(done){
            var myclient = Client.create({name: 'this is for the gods'});

            myclient.then(function(res){
                id = res._id;
                res.should.have.property('createdAt');
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should add updatedAt', function(done){
            var myclient = Client.create({name: 'i am a demigod!'});
            myclient.then(function(res){
                id2 = res._id;
                return Client.updateMany({_id: id},{name: 'This is the titan'});
            })
                .then(function(res){
                    return Client.findById(id);
                })
                .then(function(res){
                    res.should.have.property('updatedAt');
                    done();
                })
                .catch(function(err){
                    done(err);
                });
        });

        it('should tag database entries properly', async function(){
            var myclient = await Client.create({name: 'femi',someOtherStringData: 'stuff'});
            
            return q.Promise(function(resolve, reject) {
                setTimeout(function(){
                    Client.findById(myclient._id)
                        .then(function(res){
                            console.log(res);
                            res.tags.length.should.equal(2);/* jslint ignore:line */
                            resolve(res);
                        })
                        .catch(function(err){
                            reject(err);
                        });
                },3000);
            });
            
        });

        it('should count returned records', function(done){
            var myclient = Client.estimatedDocumentCount({name: 'This is the titan'});

            myclient.then(function(res){
                res.should.be.a.number; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find a record by id', function(done){
            var myclient = Client.findById(id);

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find a record by id and delete', function(done){
            var myclient = Client.findByIdAndRemove(id2);

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find a record by id and update', function(done){
            var myclient = Client.findByIdAndUpdate(id,{name: 'fufu'});

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find the first match from a query', function(done){
            var myclient = Client.findOne({name: 'fufu'});

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find the first match from a query and update', function(done){
            var myclient = Client.findOneAndUpdate({name: 'fufu'},{name: 'funmi'});

            myclient.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
                .catch(function(err){
                    done(err);
                });
        });

        it('should find the first match from a query and delete', function(done){
            var myclient = Client.findOneAndRemove({name: 'funmi'});

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
