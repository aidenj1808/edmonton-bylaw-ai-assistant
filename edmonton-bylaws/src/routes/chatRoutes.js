import express from 'express';
import Chat from '../models/Chat.js'; // Assuming you have a Chat model

const router = express.Router();

// Fetch all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch chats', error: err.message });
    }
});

export default router;
