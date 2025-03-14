import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    userEmail: {type: String, required: [true],},
    date: {type: Date, required: [true],},
    summary: {type: String, required: [true],}
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;