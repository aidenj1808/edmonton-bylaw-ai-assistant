import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/crud'; // Connect to 'crud' database

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully to the "crud" database');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

connectDB();

export default mongoose; // Export the mongoose instance for use elsewhere
