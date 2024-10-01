const CustomerService = require('../services/customer.services');

const createCustomerWithAddress = async (req, res) => {
    try {
        const { customerData, addressDataList } = req.body;

        const { customer, addresses } = await CustomerService.createCustomerWithAddress(customerData, addressDataList);

        res.status(201).json({
            message: 'Khách hàng và địa chỉ đã được tạo thành công!',
            customer,
            addresses
        });
    } catch (error) {
        console.error('Error in createCustomerWithAddress:', error);
        res.status(500).json({ message: error.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchCustomers = async (req, res) => {
    try {
        const customers = await CustomerService.searchCustomers(req.query);
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllCustomers,
    searchCustomers,
    createCustomerWithAddress,
};
