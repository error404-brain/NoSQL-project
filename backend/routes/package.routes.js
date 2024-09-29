const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/package.controller');

router.get('/all', PackageController.getAllPackages);

router.get('/code', PackageController.getPackagesByPackageCode);

module.exports = router;
