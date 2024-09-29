const adđressService = require('../services/addres.services');

const createAddress = async (req, res) => {
    try {
        const address = await adđressService.createAddress(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await adđressService.getAllAddresses();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

const getAddressById = async (req, res) => {
    try {
        const address = await adđressService.getAddressById(req.params.id);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
 createAddress, 
 getAllAddresses,
 getAddressById
 };
