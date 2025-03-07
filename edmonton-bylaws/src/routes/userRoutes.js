import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;