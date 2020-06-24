'use strict';

const db = require('../services/database').mongo;
const addressSchema = require('./Address').schema;

const collection = 'Clients';

const guardianSchema = db._mongoose.Schema({
    role: String,
    firstName: String,
    lastName: String,
    address: addressSchema,
    telephone: String
});

const allergySchema = db._mongoose.Schema({
    name: String,
    reaction: String,
    severity: String
});

const immunizationSchema = db._mongoose.Schema({
    date: Date,
    name: String,
    type: String,
    doseQuantity: { value: Number, unit: String },
    instructions: String
});

const schemaObject = {
    firstName: String,
    lastName: String,
    gender: String,
    martialStatus: String,
    religiousAffiliation: String,
    ethnicity: String,
    languageSpoken: String,
    address: addressSchema,
    telephone: String,
    birthday: Date,
    guardian: guardianSchema,
    immunizations: [immunizationSchema],
    allergies: [allergySchema],
    provider: { type: db._mongoose.Schema.Types.ObjectId, ref: 'Providers' },
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
