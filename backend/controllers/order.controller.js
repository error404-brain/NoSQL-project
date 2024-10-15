const orderService = require("../services/order.services");

// Controller để tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller để tra cứu đơn hàng theo mã đơn hàng
const searchOrder = async (req, res) => {
  const { orderCode } = req.query; // Lấy orderCode từ query string
  try {
    if (!orderCode) {
      return res.status(400).json({ message: "Vui lòng cung cấp mã đơn hàng" });
    }
    const orders = await orderService.searchOrders({ orderCode });
    if (orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng phù hợp" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { orderCode } = req.params;
  try {
    const updatedOrder = await orderService.updateOrder(orderCode, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderCode } = req.params;
  try {
    const deletedOrder = await orderService.deleteOrder(orderCode);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json({ message: "Đơn hàng đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createOrder,
  searchOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
