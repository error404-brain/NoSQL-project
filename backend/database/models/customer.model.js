const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerCode: { type: String, required: true },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    addresses: [{ type: String }] // Chứa mã địa chỉ
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
