'use strict';

const db = require('../services/database').mongo;

const collection = 'Medications';

const schemaObject = {
    name: String,
    Date: Date,
    type: String,
    instructions: String,
    doseQuantity: { value: Number, unit: String },
    rateQuantity: { value: Number, unit: String },
    prescriber: { type: db._mongoose.Schema.Types.ObjectId, ref: 'Providers' },
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