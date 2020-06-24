'use strict';

const Medications = require('../models').Medications;
const initializeController = require('./initialize');

const MedicationsController = {};

initializeController(MedicationsController, Medications);

module.exports = MedicationsController;
