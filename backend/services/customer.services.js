const Customer = require('../database/models/customer.model');
const addressService = require('../services/addres.services'); 

const checkDuplicateCustomer = async (customerCode, phoneNumber) => {
    const customer = await Customer.findOne({
        $or: [
            { customerCode }, // Kiểm tra mã khách hàng
            { phoneNumber }   // Kiểm tra số điện thoại
        ]
    });
    return customer ? true : false;
};

const createCustomerWithAddress = async (customerData, addressDataList) => {
    try {
        // Kiểm tra trùng lặp mã khách hàng hoặc số điện thoại
        const isDuplicate = await checkDuplicateCustomer(customerData.customerCode, customerData.phoneNumber);
        if (isDuplicate) {
            throw new Error('Mã khách hàng hoặc số điện thoại đã tồn tại');
        }

        // Tạo tất cả các địa chỉ
        const addressIds = [];
        for (const addressData of addressDataList) {
            const newAddress = await addressService.createAddress(addressData);
            addressIds.push(newAddress._id);
        }

        // Gán danh sách địa chỉ vào khách hàng
        customerData.addresses = addressIds;

        // Tạo khách hàng mới
        const newCustomer = new Customer(customerData);
        await newCustomer.save();

        return { customer: newCustomer, addresses: addressIds };
    } catch (error) {
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo khách hàng và địa chỉ.');
    }
};



const getAllCustomers = async () => {
    return await Customer.find();
};

const searchCustomers = async ({ phoneNumber }) => {
    return await Customer.find({ phoneNumber });
};

module.exports = {
    createCustomerWithAddress,
    getAllCustomers,
    searchCustomers,
    checkDuplicateCustomer
};
