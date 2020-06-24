'use strict';

const Providers = require('../models').Providers;

const ProvidersController = {};

ProvidersController.find = function (req, res, next) {
    const fProviders = Providers.find();

    fProviders
        .then(function(providers) {
            res.ok(providers);
        })
        .catch(function(err){
            next(err);
        });
};

ProvidersController.findOne = function (req, res, next) {
    const id = req.params.id;
    const fClient = Providers.findById(id);

    fClient
        .then(function(provider) {
            if (provider) {
                res.ok(provider);
            } else {
                next();
            }
        })
        .catch(function(err){
            next(err);
        });
};

ProvidersController.create = function (req, res, next) {
    const data = req.body;

    Providers.create(data)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err) {
            next(err);
        });
};

ProvidersController.updateOne = function(req, res, next) {
    const id = req.params.id;
    const data  = req.body;
    
    Providers.findByIdAndUpdate(id, data)
        .then(function(resp){
            if (!resp) {
                next();
            } else {
                res.ok(resp);
            }
        })
        .catch(function(err){
            next(err);
        });
};

ProvidersController.deleteOne = function (req, res, next) {
    const id = req.params.id;

    Providers.findByIdAndRemove(id)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err){
            next(err);
        });
};

module.exports = ProvidersController;
