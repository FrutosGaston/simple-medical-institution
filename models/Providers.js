'use strict';

const db = require('../services/database').mongo;
const addressSchema = require('./Address').schema;

const collection = 'Providers';

const schemaObject = {
    name: String,
    address: addressSchema,
    telephone: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
};

const Schema = db._mongoose.Schema(schemaObject);

Schema.pre('update', function(next) {
    this._update.updatedAt = new Date(Date.now()).toISOString();
    next();
});

const Model = db.model(collection, Schema);
Model._mongoose = db._mongoose;

module.exports = Model;
