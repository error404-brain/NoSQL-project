const CustomerService = require('../services/customer.services');

// Tạo khách hàng
const createCustomer = async (req, res) => {
    try {
        const customer = await CustomerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy tất cả khách hàng
const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Tìm kiếm khách hàng
const searchCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.searchCustomers(req.query);
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    searchCustomers
};
