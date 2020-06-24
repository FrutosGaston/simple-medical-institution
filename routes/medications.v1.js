'use strict';
const express = require('express');
const router = express.Router();
const medicationsController = require('../controllers/Medications');
const commonRouter = require('./common');

const service = 'medications';

commonRouter.createCRUDResources(service, medicationsController);

module.exports = router;
