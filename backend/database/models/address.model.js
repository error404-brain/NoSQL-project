const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressCode: { type: String, required: true },
    customerCode: { type: String, required: true },
    receiverName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    addressDetails: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
