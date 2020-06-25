'use strict';
const express = require('express');
const router = express.Router();

router.createCRUDResources = function (resourceName, controller) {
    router.get('/' + resourceName, controller.find);

    router.get('/' + resourceName + '/:id', controller.findOne);

    router.post('/' + resourceName, controller.validate(), controller.create);

    router.patch('/' + resourceName + '/:id', controller.updateOne);

    router.delete('/' + resourceName + '/:id', controller.deleteOne);
};

module.exports = router;
