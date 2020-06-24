'use strict';

const PlansOfCare = require('../models').PlansOfCare;

const PlansOfCareController = {};

PlansOfCareController.find = function (req, res, next) {
    const fPlansOfCare = PlansOfCare.find();

    fPlansOfCare
        .then(function(planOfCares) {
            res.ok(planOfCares);
        })
        .catch(function(err){
            next(err);
        });
};

PlansOfCareController.findOne = function (req, res, next) {
    const id = req.params.id;
    const fClient = PlansOfCare.findById(id);

    fClient
        .then(function(client) {
            if (client) {
                res.ok(client);
            } else {
                next();
            }
        })
        .catch(function(err){
            next(err);
        });
};

PlansOfCareController.create = function (req, res, next) {
    const data = req.body;

    PlansOfCare.create(data)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err) {
            next(err);
        });
};

PlansOfCareController.updateOne = function(req, res, next) {
    const id = req.params.id;
    const data  = req.body;
    
    PlansOfCare.findByIdAndUpdate(id, data)
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

PlansOfCareController.deleteOne = function (req, res, next) {
    const id = req.params.id;

    PlansOfCare.findByIdAndRemove(id)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err){
            next(err);
        });
};

module.exports = PlansOfCareController;
