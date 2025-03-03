import express from 'express';
import User from '../models/User.js'; // Import the User model

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    console.log('New user request:', req.body); // Log incoming request data

    try {
        const user = new User(req.body); // Create a new user instance from the request body
        await user.save(); // Save user to the database
        console.log('User saved:', user); // Log saved user details
        res.status(201).send(user); // Respond with the created user
    } catch (err) {
        console.error('Error creating user:', err.message); // Log any errors
        res.status(400).send({ error: err.message }); // Send an error response
    }
});

// Get all users
router.get('/', async (req, res) => {
    console.log('Fetching all users...'); // Log request to fetch users

    try {
        const users = await User.find(); // Retrieve all users from the database
        console.log('Users retrieved:', users.length); // Log the number of users found
        res.send(users); // Respond with the list of users
    } catch (err) {
        console.error('Error fetching users:', err.message); // Log any errors
        res.status(500).send({ error: err.message }); // Send an error response
    }
});

export default router; // Export the router for use in the main app
