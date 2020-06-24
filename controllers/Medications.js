'use strict';

const Medications = require('../models').Medications;
const initializeController = require('./initialize');
const { body } = require('express-validator/check');

const MedicationsController = {};

initializeController(MedicationsController, Medications);

MedicationsController.validate = () => {
    return [
        body('name', "name is required").exists(),
        body('date', "date is required").exists(),
        body('client', "client is required").exists()
    ];
};

module.exports = MedicationsController;
