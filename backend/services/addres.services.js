const Address = require("../database/models/address.model");

// Tạo địa chỉ mới
const createAddress = async (addressData) => {
  const address = new Address(addressData);
  return await address.save();
};

// Lấy tất cả địa chỉ
const getAddressesByCustomerCode = async ({ customerCode }) => {
  return await Address.find({ customerCode });
};

// Lấy tất cả địa chỉ
const getAllAddresses = async () => {
  return await Address.find();
};

// Lấy địa chỉ theo mã
const getAddressById = async (id) => {
  return await Address.findById(id);
};

const updateAddress = async (address) => {
  // upsert để tạo document mới nếu address không có sẵn trong database (trường hợp thêm address)
  return await Address.updateOne({ addressCode: address.addressCode }, address, { upsert: true });
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressesByCustomerCode,
  getAddressById,
  updateAddress,
};
