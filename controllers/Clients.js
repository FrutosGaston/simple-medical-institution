'use strict';

const Clients = require('../models').Clients;
const initializeController = require('./initialize');
const { body } = require('express-validator/check');

const ClientsController = {};

initializeController(ClientsController, Clients);

ClientsController.validate = () => {
    return [
        body('firstName', "firstName is required").exists(),
        body('lastName', "lastName is required").exists(),
        body('gender', "gender is required").exists(),
        body('address', "address is required").exists(),
        body('birthday', "birthday is required").exists(),
        body('telephone', "telephone is required").exists()
    ];
};

ClientsController.addImmunization = function (req, res, next) {
    const id = req.params.clientId;
    const data  = req.body;

    Clients.update({ _id: id }, { $push: { immunizations: data } })
        .then(function () {
            res.ok();
        })
        .catch(function(err){
            next(err);
        });
};

ClientsController.removeImmunization = function (req, res, next) {
    const clientId = req.params.clientId;
    const id = req.params.id;

    Clients.update({ _id: clientId }, { $pull: { immunizations: { _id: id } } })
        .then(function () {
            res.ok();
        })
        .catch(function(err){
            next(err);
        });
};

ClientsController.addAllergy = function (req, res, next) {
    const id = req.params.clientId;
    const data  = req.body;

    Clients.update({ _id: id }, { $push: { allergies: data } })
        .then(function () {
            res.ok();
        })
        .catch(function(err){
            next(err);
        });
};

ClientsController.removeAllergy = function (req, res, next) {
    const clientId = req.params.clientId;
    const id = req.params.id;

    Clients.update({ _id: clientId }, { $pull: { allergies: { _id: id } } })
        .then(function () {
            res.ok();
        })
        .catch(function(err){
            next(err);
        });
};

module.exports = ClientsController;
