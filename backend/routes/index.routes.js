const express = require('express');
const router = express.Router();

const customerRoutes = require('./customer.routes');
const addressRoutes = require('./addres.routes');
const orderRoutes = require('./order.routes'); // Import route của Order
const packageRoutes = require('./package.routes');

router.use('/customers', customerRoutes);
router.use('/addresses', addressRoutes);
router.use('/orders', orderRoutes);  
router.use('/packages', packageRoutes);

module.exports = router;
