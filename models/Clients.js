'use strict';

const db = require('../services/database').mongo;
const addressSchema = require('./Address').schema;

const collection = 'Clients';

const requiredString = { type: String, required: true };

const guardianSchema = db._mongoose.Schema({
    role: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    address: addressSchema,
    telephone: requiredString
});

const allergySchema = db._mongoose.Schema({
    name: requiredString,
    reaction: requiredString,
    severity: requiredString
});

const immunizationSchema = db._mongoose.Schema({
    date: { type: Date, required: true },
    name: requiredString,
    type: String,
    doseQuantity: { value: Number, unit: String },
    instructions: String
});

const schemaObject = {
    firstName: requiredString,
    lastName: requiredString,
    gender: requiredString,
    martialStatus: String,
    religiousAffiliation: String,
    ethnicity: String,
    languageSpoken: String,
    address: addressSchema,
    telephone: requiredString,
    birthday: { type: Date, required: true },
    guardian: guardianSchema,
    immunizations: [immunizationSchema],
    allergies: [allergySchema],
    provider: { type: db._mongoose.Schema.Types.ObjectId, ref: 'Providers' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
};

const Schema = db._mongoose.Schema(schemaObject);

Schema.pre('update', function (next) {
    this._update.updatedAt = new Date(Date.now()).toISOString();
    next();
});

const Model = db.model(collection, Schema);
Model._mongoose = db._mongoose;

module.exports = Model;
