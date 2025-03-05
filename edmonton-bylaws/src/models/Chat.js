import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    message: String,
    sender: String,
    timestamp: Date,
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
