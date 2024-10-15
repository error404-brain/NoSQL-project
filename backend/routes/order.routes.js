const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');

// Route để tạo đơn hàng mới
router.post('/create', OrderController.createOrder);

router.get('/search', OrderController.searchOrder);

router.get('/', OrderController.getAllOrders);

router.put('/:orderCode', OrderController.updateOrder);

router.delete('/:orderCode', OrderController.deleteOrder);

module.exports = router;
