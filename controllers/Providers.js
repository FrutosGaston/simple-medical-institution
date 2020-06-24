'use strict';

const Providers = require('../models').Providers;
const initializeController = require('./initialize');

const ProvidersController = {};

initializeController(ProvidersController, Providers);

module.exports = ProvidersController;
