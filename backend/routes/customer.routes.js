const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller');

router.post('/create', CustomerController.createCustomer);
router.get('/all', CustomerController.getAllCustomers);
router.get('/search', CustomerController.searchCustomers);


module.exports = router;
