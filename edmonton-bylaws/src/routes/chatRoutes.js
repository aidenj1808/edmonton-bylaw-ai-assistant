import express from 'express';
import Chat from '../models/Chat.js';
import { ChatDTO } from '../features/chatbot/chatbot-dto.js';

const router = express.Router();

// Fetch all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Chat.find();
        const chatDTOs = chats.map(chat => 
            new ChatDTO(chat.userEmail, chat.prompt, chat.response, chat.sequenceNumber)
        );
        res.json(chatDTOs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch chats', error: err.message });
    }
});

// Add a new chat
router.post('/', async (req, res) => {
    const { userEmail, prompt, response, sequenceNumber } = req.body;

    if (!userEmail || !prompt || !response || sequenceNumber === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const chatDTO = new ChatDTO(userEmail, prompt, response, sequenceNumber);
        const chat = new Chat(chatDTO);
        await chat.save();
        res.status(201).json(chatDTO);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create chat', error: err.message });
    }
});

export default router;
