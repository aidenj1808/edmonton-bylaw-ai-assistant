import Chat from "../models/Chat.js"
import Conversation from "../models/Conversation.js";
import mongoose from 'mongoose';

export const createConversation = async (req, res) => {
    try{
        const newConversation = new Conversation(req.body);
        await newConversation.save();
        res.status(201).json({ message: "Conversation Created", conversation: newConversation });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const storeChat = async (req, res) => {
    try{
        const newChat = new Chat(req.body);
        await newChat.save();
        res.status(201).json({ message: "Chat Stored", chat: newChat });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

// Can be used to update data or topic
export const updateConversation = async (req, res) => {
    try {
        let updatedConversation = null;
        if(req.body.date != null){
            updatedConversation = await Conversation.findOneAndUpdate(
                {_id: req.body.conversationRef}, 
                {$set: {date: req.body.date}}, 
                {new: true,});
        }
        else{
            updatedConversation = await Conversation.findOneAndUpdate(
                {_id: req.body.conversationRef}, 
                {$set: {summary: req.body.summary}}, 
                {new: true,});
        }
        // Check if update was successful
        if (!updatedConversation) {
          return res.status(404).json({ message: "Could not find conversation" });
        }
        // Return the updated conversation
        res.status(200).json(updatedConversation);
      } catch (error) {

        res.status(500).json({ message: error.message });
      }
}

export const getConversations = async (req, res) => {
    try {
        const email = req.params.email.trim(); // Extract email from URL parameters

        const conversations = await Conversation.find({userEmail: email});
        if (!conversations) return res.status(404).json({ message: "User has no conversation" });
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getChatHistory = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id); // Convert to ObjectId
        console.log("querying with id: " + id);

        const chats = await Chat.find({conversationRef: id});
        if (!chats) return res.status(404).json({ message: "Conversation has no chats" });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}