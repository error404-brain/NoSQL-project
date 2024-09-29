const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchCode: { type: String, required: true },
    branchName: { type: String, required: true },
    branchAddress: { type: String, required: true },
    branchPhone: { type: String, required: true },
    branchEmail: { type: String, required: true }
});

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;
