'use strict';
const express = require('express');
const router = express.Router();
const plansOfCareController = require('../controllers/PlansOfCare');
const commonRouter = require('./common');

const service = 'plans-of-care';

commonRouter.createCRUDResources(service, plansOfCareController);

module.exports = router;
