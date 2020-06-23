'use strict';
var express = require('express');
var router = express.Router();
var validator = require('../services/validator');
var clientsController = require('../controllers/Clients');

var service = 'clients';

router.get('/'+service, clientsController.find);

router.get('/'+service+'/:id', clientsController.findOne);

router.post('/'+service, clientsController.create);

router.patch('/'+service+'/:id', clientsController.updateOne);

router.delete('/'+service+'/:id', clientsController.deleteOne);

module.exports = router;
