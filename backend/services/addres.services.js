const Address = require('../database/models/address.model');

// Tạo địa chỉ mới
const createAddress = async (addressData) => {
    const address = new Address(addressData);
    return await address.save();
};

// Lấy tất cả địa chỉ
const getAllAddresses = async () => {
    return await Address.find();
};

// Lấy địa chỉ theo mã
const getAddressById = async (id) => {
    return await Address.findById(id);
};

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById
};
