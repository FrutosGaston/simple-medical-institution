'use strict';

const db = require('../services/database').mongo;

const collection = 'Encounters';

const schemaObject = {
    name: String,
    date: Date,
    provider: String,
    location: String,
    client: { type: db._mongoose.Schema.Types.ObjectId, ref: 'Clients' },
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
