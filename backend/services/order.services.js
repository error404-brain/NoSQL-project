const Order = require('../database/models/order.model');
const PackageService = require("../services/package.services");

// Kiểm tra xem gói hàng đã được xử lý chưa
const checkPackageConflict = async (packages) => {
  const existingOrder = await Order.findOne({
    packages: { $in: packages }, // Kiểm tra xem có gói hàng nào trùng không
    orderStatus: { $in: ["Đang xử lý", "Đã giao"] }, // Trạng thái cần kiểm tra
  });
  return existingOrder;
};

const createOrder = async (orderData) => {
  const createdOrder = await Order.create(orderData);
  if (orderData.packages && orderData.packages.length > 0) {
    await PackageService.updatePackagesWithOrderCode(createdOrder.orderCode, orderData.packages);
  }

  return createdOrder;
};


// Tìm kiếm đơn hàng theo mã đơn hàng
const searchOrders = async ({ orderCode }) => {
  return await Order.find({ orderCode: { $regex: orderCode, $options: 'i' } });
};

const updateOrder = async (orderCode, updateData) => {
  const { packages } = updateData;

  // Kiểm tra xung đột mã gói hàng khi cập nhật
  const existingOrder = await checkPackageConflict(packages);
  if (existingOrder) {
    throw new Error(
      `Gói hàng ${existingOrder.packages.join(", ")} đã được xử lý trong đơn hàng ${existingOrder.orderCode}.`
    );
  }

  return await Order.findOneAndUpdate({ orderCode }, updateData, { new: true });
};

const deleteOrder = async (orderCode) => {
  const order = await Order.findOne({ orderCode });

  if (!order) {
    throw new Error("Không tìm thấy đơn hàng.");
  }

  if (order.orderStatus !== "Hủy") {
    throw new Error("Chỉ có thể xóa đơn hàng ở trạng thái 'Hủy'.");
  }

  return await Order.findOneAndDelete({ orderCode });
};


const getAllOrders = async () => {
  return await Order.find();
};

module.exports = {
  createOrder,
  searchOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
