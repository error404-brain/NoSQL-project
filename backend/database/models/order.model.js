const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderCode: { type: String, required: true },
    customerCode: { type: String, required: true },
    receiverCode: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, required: true },
    packages: [{ type: String }] // Chứa mã bưu phẩm
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
