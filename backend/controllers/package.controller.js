const packageService = require('../services/package.services');

const createPackage = async (req, res) => {
    try {
        const package = await packageService.createPackage(req.body);
        res.status(201).json(package);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPackages = async (req, res) => {
    try {
        const packages = await packageService.getAllPackages();
        res.status(200).json(packages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getPackagesByPackageCode = async (req, res) => {
    const { packageCode } = req.query; 
    try {
        const packages = await packageService.getPackgesbyPackageCode(packageCode);
        if (packages.length === 0) {
            return res.status(404).json({ message: 'Bưu phẩm không tồn tại' }); 
        }
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createPackage,  
    getAllPackages,
    getPackagesByPackageCode
}