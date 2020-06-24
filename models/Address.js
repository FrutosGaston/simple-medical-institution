const db = require('../services/database').mongo;

const Address = {};

Address.schema = db._mongoose.Schema({
    streetNumber: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: String
});

module.exports = Address;
