'use strict';

const PlansOfCare = require('../models').PlansOfCare;
const initializeController = require('./initialize');
const { body } = require('express-validator/check');

const PlansOfCareController = {};

initializeController(PlansOfCareController, PlansOfCare);

PlansOfCareController.validate = () => {
    return [
        body('name', 'name is required').exists(),
        body('date', 'date is required').exists(),
        body('client', 'client is required').exists()
    ];
};

module.exports = PlansOfCareController;
