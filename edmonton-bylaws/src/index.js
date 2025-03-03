import 'dotenv/config'; // For environment variables
import express from 'express';
import mongoose from './db.js'; // Make sure the database connection file is correctly set up
import userRoutes from './routes/userRoutes.js'; // Import user routes
import chatRoutes from './routes/chatRoutes.js'; // Import chat routes

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Use the user routes for /api/users endpoint
app.use('/api/users', userRoutes);

// Use the chat routes for /api/chats endpoint
app.use('/api/chats', chatRoutes);

// Root endpoint
app.get('/', (req, res) => {
    console.log('Root endpoint accessed.');
    res.send('Hello, CMPT 315 Project is live! 🚀');
});

// Start the server and connect to MongoDB
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
