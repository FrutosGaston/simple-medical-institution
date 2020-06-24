'use strict';

const Encounters = require('../models').Encounters;

const EncountersController = {};

EncountersController.find = function (req, res, next) {
    const fEncounters = Encounters.find();

    fEncounters
        .then(function(encounters) {
            res.ok(encounters);
        })
        .catch(function(err){
            next(err);
        });
};

EncountersController.findOne = function (req, res, next) {
    const id = req.params.id;
    const fClient = Encounters.findById(id);

    fClient
        .then(function(encounter) {
            if (encounter) {
                res.ok(encounter);
            } else {
                next();
            }
        })
        .catch(function(err){
            next(err);
        });
};

EncountersController.create = function (req, res, next) {
    const data = req.body;

    Encounters.create(data)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err) {
            next(err);
        });
};

EncountersController.updateOne = function(req, res, next) {
    const id = req.params.id;
    const data  = req.body;
    
    Encounters.findByIdAndUpdate(id, data)
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

EncountersController.deleteOne = function (req, res, next) {
    const id = req.params.id;

    Encounters.findByIdAndRemove(id)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err){
            next(err);
        });
};

module.exports = EncountersController;
