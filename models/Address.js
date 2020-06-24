const db = require('../services/database').mongo;

const Address = {};

Address.schema = db._mongoose.Schema({
    streetNumber: String,
    street: String,
    city: String,
    state: String,
    zip: String
});

module.exports = Address;
