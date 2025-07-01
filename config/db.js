const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
    dotenv.config();
    try {
        await mongoose.connect(process.env.MoNGO_URI)
        console.log('MongoDB connected successfully');
    }
    catch (error){
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;