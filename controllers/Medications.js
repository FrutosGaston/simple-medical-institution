'use strict';

const Medications = require('../models').Medications;

const MedicationsController = {};

MedicationsController.find = function (req, res, next) {
    const fMedications = Medications.find();

    fMedications
        .then(function(medications) {
            res.ok(medications);
        })
        .catch(function(err){
            next(err);
        });
};

MedicationsController.findOne = function (req, res, next) {
    const id = req.params.id;
    const fClient = Medications.findById(id);

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

MedicationsController.create = function (req, res, next) {
    const data = req.body;

    Medications.create(data)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err) {
            next(err);
        });
};

MedicationsController.updateOne = function(req, res, next) {
    const id = req.params.id;
    const data  = req.body;
    
    Medications.findByIdAndUpdate(id, data)
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

MedicationsController.deleteOne = function (req, res, next) {
    const id = req.params.id;

    Medications.findByIdAndRemove(id)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err){
            next(err);
        });
};

module.exports = MedicationsController;
