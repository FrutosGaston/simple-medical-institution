'use strict';
const express = require('express');
const router = express.Router();
const encountersController = require('../controllers/Encounters');
const commonRouter = require('./common');

const service = 'encounters';

commonRouter.createCRUDResources(service, encountersController);

module.exports = router;
