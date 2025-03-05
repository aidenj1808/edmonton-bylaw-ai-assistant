import express from 'express';
import User from '../models/User.js'; // Assuming you have a User model

const router = express.Router();

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
});

export default router;
