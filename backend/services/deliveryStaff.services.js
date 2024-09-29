const DeliveryStaff = require('../database/models/deliveryStaff.model');

const createDeliveryStaff = async (req, res) => {
    try {
        const deliveryStaff = await DeliveryStaff.createDeliveryStaff(req.body);
        res.status(201).json(deliveryStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllDeliveryStaff = async () => {
    return await DeliveryStaff.find();
}

const getDeliveryStaffById = async (id) => {
    return await DeliveryStaff.findById(id);
}

const updateDeliveryStaffById = async (id, deliveryStaffData) => {
    return await DeliveryStaff.findByIdAndUpdate(id, deliveryStaffData);
}

const deleteDeliveryStaffById = async (id) => {
    return await DeliveryStaff.findByIdAndDelete(id);
}


module.exports = {
    createDeliveryStaff,
    getAllDeliveryStaff,
    getDeliveryStaffById,
    updateDeliveryStaffById,
    deleteDeliveryStaffById
};  