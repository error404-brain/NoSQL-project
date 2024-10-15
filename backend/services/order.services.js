const Order = require('../database/models/order.model');

// Tạo đơn hàng mới
const createOrder = async (order) => {
    const newOrder = new Order(order);
    return await newOrder.save();
};

// Tìm kiếm đơn hàng theo mã đơn hàng
const searchOrders = async ({ orderCode }) => {
    return await Order.find({ orderCode: { $regex: orderCode, $options: 'i' } });
};

const updateOrder = async (orderCode, updateData) => {
    return await Order.findOneAndUpdate(
      { orderCode },
      updateData,
      { new: true }
    );
  }

  const deleteOrder = async (orderCode) => {
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
    getAllOrders
};
