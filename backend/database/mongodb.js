const mongoose = require('mongoose');

// Kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/express_delivery');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Dừng chương trình nếu kết nối thất bại
    }
};

module.exports = connectDB;
