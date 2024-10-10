const CustomerService = require("../services/customer.services");

const createCustomerWithAddress = async (req, res) => {
  try {
    const { customerData, addressDataList } = req.body;

    // Gọi service để kiểm tra và tạo khách hàng cùng danh sách địa chỉ
    const { customer, addresses } = await CustomerService.createCustomerWithAddress(
      customerData,
      addressDataList
    );

    res.status(201).json({
      message: "Khách hàng và địa chỉ đã được tạo thành công!",
      customer,
      addresses,
    });
  } catch (error) {
    console.error("Error in createCustomerWithAddress:", error);
    res.status(500).json({ message: error.message });
  }
};

const getCustomerByCode = async (req, res) => {
  try {
    const customer = await CustomerService.getCustomerByCode(req.query);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

const searchCustomersByPhone = async (req, res) => {
  try {
    const customers = await CustomerService.searchCustomersByPhone(req.query);
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// TODO: search customer by email
const searchCustomersByEmail = async (req, res) => {
  try {
    const customers = await CustomerService.searchCustomersByEmail(req.query);
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// TODO: Update Customer
const updateCustomerWithAddress = async (req, res) => {
  try {
    const { customerData, addressDataList } = req.body;

    // Gọi service để kiểm tra và tạo khách hàng cùng danh sách địa chỉ
    await CustomerService.updateCustomerWithAddress(customerData, addressDataList);

    res.status(200).json({
      message: "Khách hàng và địa chỉ đã được cập nhật thành công!",
    });
  } catch (error) {
    console.error("Error in createCustomerWithAddress:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerByCode,
  searchCustomersByPhone,
  searchCustomersByEmail,
  createCustomerWithAddress,
  updateCustomerWithAddress,
};
