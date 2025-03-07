import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  // Import CORS middleware
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// ✅ Enable CORS for all origins (you can restrict this later to a specific origin)
app.use(cors());

// ✅ Connect to MongoDB using Mongoose
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chatbotDB";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the API! Use /api/users to register or fetch users.');
});

// ✅ Use User Routes
app.use('/api/users', userRoutes);

// ✅ Ensure graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit();
});

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
