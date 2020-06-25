'use strict';
const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/Clients');
const commonRouter = require('./common');

const service = 'clients';

commonRouter.createCRUDResources(service, clientsController);

router.post('/' + service + '/:clientId/immunizations', clientsController.addImmunization);

router.delete('/' + service + '/:clientId/immunizations/:id', clientsController.removeImmunization);

router.post('/' + service + '/:clientId/allergies', clientsController.addAllergy);

router.delete('/' + service + '/:clientId/allergies/:id', clientsController.removeAllergy);

module.exports = router;
