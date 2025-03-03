import express from 'express';
import Chat from '../models/Chat.js';

const router = express.Router();

// Send a message (Save to MongoDB)
router.post('/', async (req, res) => {
    console.log('New chat message request:', req.body);

    const { sender, message } = req.body;
    if (!sender || !message) {
        console.warn('Invalid message payload:', req.body);
        return res.status(400).send({ error: 'Sender and message are required' });
    }

    try {
        const newMessage = new Chat({ sender, message });
        await newMessage.save();
        console.log('Message saved:', newMessage);
        res.status(201).send(newMessage);
    } catch (err) {
        console.error('Error saving message:', err.message);
        res.status(500).send({ error: err.message });
    }
});

// Get all messages from MongoDB
router.get('/', async (req, res) => {
    console.log('Fetching all chat messages...');
    
    try {
        const messages = await Chat.find();
        console.log('Messages retrieved:', messages.length);
        res.send(messages);
    } catch (err) {
        console.error('Error fetching messages:', err.message);
        res.status(500).send({ error: err.message });
    }
});

export default router;
