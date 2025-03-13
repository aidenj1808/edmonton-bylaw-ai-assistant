import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    userEmail: {type: String, required: [true],},
    prompt: {type: String, required: [true],},
    response: {type: String, required: [true],},
    date: {type: Date, required: [true],},
    sequenceNumber: {type: Number, required: [true],}
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;