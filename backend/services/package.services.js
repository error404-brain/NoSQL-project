const packageModel = require("../database/models/package.model");
const PackageService = require('../services/package.services'); // Đảm bảo rằng đường dẫn là chính xác

// Tạo bưu phẩm mới
const createPackage = async (data) => {
  return await packageModel.create(data);
};

const updatePackage = async ({ updatePackage }) => {
  return await packageModel.findOneAndUpdate(
    { packageCode: updatePackage.packageCode },
    updatePackage
  );
};


const checkPackagesExist = async (packagesArray) => {
  return await Package.find({ packageCode: { $in: packagesArray } });
};
// Lấy tất cả bưu phẩm
const getAllPackages = async () => {
  return await packageModel.find();
};

// Tìm bưu phẩm theo mã (packageCode)
const getPackgesbyPackageCode = async (packageCode) => {
  return await packageModel.find({ packageCode: packageCode });
};

const updatePackagesWithOrderCode = async (orderCode, packages) => {
  await Package.updateMany(
    { packageCode: { $in: packages } }, // Cập nhật các gói hàng có mã trong danh sách
    { $set: { orderCode: orderCode } }  // Gán orderCode vào các gói hàng
  );
};
module.exports = {
  createPackage,
  updatePackage,
  getAllPackages,
  getPackgesbyPackageCode,
  updatePackagesWithOrderCode,
  checkPackagesExist,
};
