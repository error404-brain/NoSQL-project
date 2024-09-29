const branch = require('../database/models/branch.model');

const createBranch = async (req, res) => {
    try {
        const branch = await branch.createBranch(req.body);
        res.status(201).json(branch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllBranches = async () => {
    return await branch.find();
}

const getBranchById = async (id) => {
    return await branch.findById(id);
}

const deleteBranchById = async (id) => {
    return await branch.findByIdAndDelete(id);
}

const updateBranchById = async (id, branchData) => {
    return await branch.findByIdAndUpdate(id, branchData);
}

module.exports = {
    createBranch,
    getAllBranches,
    getBranchById,
    deleteBranchById,
    updateBranchById
};

