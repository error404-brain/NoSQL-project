const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/addres.controller');

router.post('/create', AddressController.createAddress);
router.get('/all', AddressController.getAllAddresses);
router.get('/:id', AddressController.getAddressById);

module.exports = router;