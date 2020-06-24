'use strict';

const Encounters = require('../models').Encounters;
const initializeController = require('./initialize');
const { body } = require('express-validator/check');

const EncountersController = {};

initializeController(EncountersController, Encounters);

EncountersController.validate = () => {
    return [
        body('name', "name is required").exists(),
        body('date', "date is required").exists(),
        body('client', "client is required").exists()
    ];
};

module.exports = EncountersController;
