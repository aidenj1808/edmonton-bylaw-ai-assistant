import Chat from "../models/Chat.js"


export const storeChat = async (req, res) => {
    try{
        const newChat = new Chat(req.body);
        await newChat.save();
        res.status(201).json({ message: "Chat Stored", chat: newChat });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getChatHistory = async (req, res) => {
    try{

    }catch (error) {

    }
}