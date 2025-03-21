import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true],},
    date: {type: Date, required: [true],},
    summary: {type: String, required: [true],}
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;