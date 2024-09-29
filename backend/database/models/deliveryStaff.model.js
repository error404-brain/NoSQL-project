const mongoose = require('mongoose');

const deliveryStaffSchema = new mongoose.Schema({
    staffCode: { type: String, required: true },
    staffName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    areaOfResponsibility: { type: String, required: true },
    staffStatus: { type: String, required: true }
});

const DeliveryStaff = mongoose.model('DeliveryStaff', deliveryStaffSchema);
module.exports = DeliveryStaff;
