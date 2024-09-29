const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');

// Route để tạo đơn hàng mới
router.post('/create', OrderController.createOrder);

// Route để tra cứu đơn hàng theo mã đơn hàng
router.get('/search', OrderController.searchOrder);

module.exports = router;
