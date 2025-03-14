import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    conversationRef: {type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: [true],},
    prompt: {type: String, required: [true],},
    response: {type: String, required: [true],},
    sequenceNumber: {type: Number, required: [true],}
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;