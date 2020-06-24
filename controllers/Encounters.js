'use strict';

const Encounters = require('../models').Encounters;
const initializeController = require('./initialize');

const EncountersController = {};

initializeController(EncountersController, Encounters);

module.exports = EncountersController;
