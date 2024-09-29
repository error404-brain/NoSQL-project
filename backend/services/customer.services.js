const Customer = require('../database/models/customer.model');

// Tạo khách hàng
const createCustomer = async (customerData) => {
    const customer = new Customer(customerData);
    return await customer.save();
};

// Lấy tất cả khách hàng
const getAllCustomers = async () => {
    return await Customer.find();
};

const searchCustomers = async ({ phoneNumber }) => {
    return await Customer.find({ phoneNumber });
}

module.exports = {
    createCustomer,
    getAllCustomers,
    searchCustomers
};
