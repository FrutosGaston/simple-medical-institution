'use strict';

const db = require('../services/database').mongo;

const collection = 'Clients';

const addressSchema = db._mongoose.Schema({
    streetNumber: String,
    street: String,
    city: String,
    state: String,
    zip: String
});

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

const medication = { type: db._mongoose.Schema.Types.ObjectId, ref: 'medication' };

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
    medications: [medication],
    provider: { type: db._mongoose.Schema.Types.ObjectId, ref: 'provider' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date

};

const Schema = db._mongoose.Schema(schemaObject);

Schema.statics.search = function(string) {
    return this.find({$text: {$search: string}}, { score : { $meta: 'textScore' } })
        .sort({ score : { $meta : 'textScore' } });
};

Schema.pre('update', function(next) {
    // Indexing for search
    const ourDoc = this._update;
    ourDoc.model = collection;
    ourDoc.update = true;

    ourDoc.updatedAt = new Date(Date.now()).toISOString();
    
    next();
});

const Model = db.model(collection, Schema);
Model._mongoose = db._mongoose;

module.exports = Model;
