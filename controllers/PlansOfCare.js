'use strict';

const PlansOfCare = require('../models').PlansOfCare;
const initializeController = require('./initialize');

const PlansOfCareController = {};

initializeController(PlansOfCareController, PlansOfCare);

module.exports = PlansOfCareController;
