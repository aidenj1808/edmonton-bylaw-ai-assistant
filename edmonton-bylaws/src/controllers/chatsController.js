import Chat from "../models/Chat.js"
import Conversation from "../models/Conversation.js";
import mongoose from 'mongoose';

export const createConversation = async (req, res) => {
    // Start session 
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const newConversation = new Conversation(req.body);
        await newConversation.save({session});

        // commit transaction and end session 
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ message: "Conversation Created", conversation: newConversation });
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
}

export const storeChat = async (req, res) => {
    // Start session 
    const session = await mongoose.startSession();
    session.startTransaction();

    const newChat = new Chat(req.body);
    const conversationRef = newChat.conversationRef;
    try{
        //Step 1. find conversation and check if days are different on conversation and chat
        const conversation = await Conversation.findById(conversationRef).session(session);
        if(!conversation){
            return res.status(404).json({message: "Conversation not found"});
        }

        // Update Date on conversation
        if (conversation.date < new Date()){
            conversation.date = new Date();
            await conversation.save({session});
        }

        //Step 2. save chat 
        await newChat.save({session});

        // commit transaction and end session 
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ message: "Chat Stored", chat: newChat });
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
}

// Can be used to update data or topic
export const updateConversation = async (req, res) => {
    // Start session 
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let updatedConversation = null;
        if(req.body.date != null){
            updatedConversation = await Conversation.findOneAndUpdate(
                {_id: req.body.conversationRef}, 
                {$set: {date: req.body.date}}, 
                {new: true,}).session(session);
        }
        else{
            updatedConversation = await Conversation.findOneAndUpdate(
                {_id: req.body.conversationRef}, 
                {$set: {summary: req.body.summary}}, 
                {new: true,}).session(session);
        }
        // Check if update was successful
        if (!updatedConversation) {
          return res.status(404).json({ message: "Could not find conversation" });
        }

        // commit transaction and end session 
        await session.commitTransaction();
        session.endSession();
        // Return the updated conversation
        res.status(200).json(updatedConversation);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
      }
}

export const getConversations = async (req, res) => {
    // Start session 
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const email = req.params.email.trim(); // Extract email from URL parameters

        const conversations = await Conversation.find({userEmail: email}).session(session);
        if (!conversations) return res.status(404).json({ message: "User has no conversation" });

        // commit transaction and end session 
        await session.commitTransaction();
        session.endSession();
        res.json(conversations);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
}

export const getChatHistory = async (req, res) => {
    // Start session 
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const id = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        const chats = await Chat.find({conversationRef: id}).session(session);
        if (!chats) return res.status(404).json({ message: "Conversation has no chats" });

        // commit transaction and end session 
        await session.commitTransaction();
        session.endSession();
        res.json(chats);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: error.message });
    }
}

export const deleteChatHistory = async (req,res) => {
  // Start session 
  const session = await mongoose.startSession();
  session.startTransaction();

  try{
    // Step 1. Get all conversations
    const email = req.params.email.trim(); // Extract email from URL parameters

    const conversations = await Conversation.find({userEmail: email}).session(session);
    if (!conversations) return res.status(404).json({ message: "User has no conversations to delete" });
    let conversationIDs = []
    for(const conversation of conversations){
        conversationIDs.push(conversation._id);
    }
    const deletedConversations = await Conversation.deleteMany({userEmail: email}).session(session);
    if (!deletedConversations) return res.status(404).json({ message: "User has no conversations to delete" });


    // Step 2. Delete all chats with references to any of the conversations 
    const chats = await Chat.deleteMany({conversationRef: {$in: conversationIDs}}).session(session);
    if (!chats) return res.status(404).json({ message: "User has no chats to delte" });

    // commit transaction and end session 
    await session.commitTransaction();
    session.endSession();
  }catch(error){
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
}