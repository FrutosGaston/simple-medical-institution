'use strict';

let db = require('../services/database').mongo;

let collection = 'Clients';

let addressSchema = db._mongoose.Schema({
    streetNumber: String,
    street: String,
    city: String,
    state: String,
    zip: String
});

let guardianSchema = db._mongoose.Schema({
    role: String,
    firstName: String,
    lastName: String,
    address: addressSchema,
    telephone: String
});

let allergySchema = db._mongoose.Schema({
    name: String,
    reaction: String,
    severity: String
});
let immunizationSchema = db._mongoose.Schema({
    date: Date,
    name: String,
    type: String,
    doseQuantity: { value: Number, unit: String },
    instructions: String
});
let medication = { type: db._mongoose.Schema.Types.ObjectId, ref: 'medication' };

let schemaObject = {
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

let Schema = db._mongoose.Schema(schemaObject);

Schema.statics.search = function(string) {
    return this.find({$text: {$search: string}}, { score : { $meta: 'textScore' } })
        .sort({ score : { $meta : 'textScore' } });
};

Schema.pre('update', function(next) {
    // Indexing for search
    let ourDoc = this._update;
    ourDoc.model = collection;
    ourDoc.update = true;

    ourDoc.updatedAt = new Date(Date.now()).toISOString();
    
    next();
});

let Model = db.model(collection, Schema);
Model._mongoose = db._mongoose;

module.exports = Model;
