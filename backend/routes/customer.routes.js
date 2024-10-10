const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer.controller");

router.post("/create", CustomerController.createCustomerWithAddress);
router.put("/update", CustomerController.updateCustomerWithAddress);
router.get("/all", CustomerController.getAllCustomers);
router.get("/search-by-code", CustomerController.getCustomerByCode);
router.get("/search-by-phone", CustomerController.searchCustomersByPhone);
router.get("/search-by-email", CustomerController.searchCustomersByEmail);

module.exports = router;
