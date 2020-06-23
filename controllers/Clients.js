'use strict';

let Clients = require('../models').Clients;

let ClientsController = {};

ClientsController.find = function (req, res, next) {
    const fClients = Clients.find();

    fClients
        .then(function(clients) {
            res.ok(clients);
        })
        .catch(function(err){
            next(err);
        });
};

ClientsController.findOne = function (req, res, next) {
    const id = req.params.id;
    const fClient = Clients.findById(id);

    fClient
        .then(function(client) {
            if (client) {
                res.ok(client);
            } else {
                next();
            }
        })
        .catch(function(err){
            next(err);
        });
};

ClientsController.create = function (req, res, next) {
    const data = req.body;

    Clients.create(data)
        .then(function(resp) {
            res.ok(resp);
        })
        .catch(function(err) {
            next(err);
        });
};

ClientsController.updateOne = function(req, res, next) {
    const id = req.params.id;
    const data  = req.body;
    
    Clients.findByIdAndUpdate(id, data)
        .then(function(resp){
            if (!resp) {
                next();
            } else {
                res.ok(resp);
            }
        })
        .catch(function(err){
            next(err);
        });
};

ClientsController.deleteOne = function (req, res, next) {
    const id = req.params.id;

    Clients.findById(id)
        .then(function(resp){
            return Clients.findByIdAndRemove(id), resp;
        })
        .spread(function(deleted, resp) {
            if(!resp){
                next();
            } else {
                res.ok(resp);
            }
        })
        .catch(function(err){
            next(err);
        });
};

module.exports = ClientsController;
