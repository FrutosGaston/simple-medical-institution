'use strict';

const Providers = require('../models').Providers;
const initializeController = require('./initialize');
const { body } = require('express-validator/check');

const ProvidersController = {};

initializeController(ProvidersController, Providers);

ProvidersController.validate = () => {
    return [
        body('name', 'name is required').exists()
    ];
};

module.exports = ProvidersController;
