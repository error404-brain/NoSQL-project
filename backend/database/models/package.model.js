const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageCode: { type: String, required: true },
    packageDescription: { type: String, required: true },
    orderCode: { type: String, required: false },
    expectedDeliveryDate: { type: Date },
    trackingNumber: { type: String, required: true },
    packageStatus: { type: String, required: true },
    deliveryInfo: {
        deliveryStaffCode: { type: String },
        branchCode: { type: String }
    }
});

const Package = mongoose.model('Package', packageSchema);
module.exports = Package;
