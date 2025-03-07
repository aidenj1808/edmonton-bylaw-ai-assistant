import mongoose from 'mongoose';

// Define the chat schema
const chatSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    date: { type: String },
    sequenceNumber: { type: Number, required: true },
});

// Create a model
const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
