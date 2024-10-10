const packageModel = require("../database/models/package.model");

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

// Lấy tất cả bưu phẩm
const getAllPackages = async () => {
  return await packageModel.find();
};

// Tìm bưu phẩm theo mã (packageCode)
const getPackgesbyPackageCode = async (packageCode) => {
  return await packageModel.find({ packageCode: packageCode });
};

module.exports = {
  createPackage,
  updatePackage,
  getAllPackages,
  getPackgesbyPackageCode,
};
