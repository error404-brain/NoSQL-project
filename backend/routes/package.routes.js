const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/package.controller");

router.get("/all", PackageController.getAllPackages);
router.get("/code", PackageController.getPackagesByPackageCode);
router.put("/update", PackageController.updatePackage);
router.post("/create", PackageController.createPackage);
router.get("/code", PackageController.getPackagesByPackageCode);
router.put("/updateOrderCode", PackageController.updatePackagesWithOrderCode);


module.exports = router;
