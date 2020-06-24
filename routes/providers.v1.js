'use strict';
const express = require('express');
const router = express.Router();
const providersController = require('../controllers/Providers');
const commonRouter = require('./common');

const service = 'providers';

commonRouter.createCRUDResources(service, providersController);

module.exports = router;
