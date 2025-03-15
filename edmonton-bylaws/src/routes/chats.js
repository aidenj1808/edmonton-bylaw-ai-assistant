import express from "express";

import {storeChat, createConversation, updateConversation, getConversations, getChatHistory} from "../controllers/chatsController.js"; 

const router = express.Router();

router.post("/", createConversation);
router.post("/chat/", storeChat);
router.put("/:conversationReference", updateConversation);
router.get("/conversations/:email", getConversations);
router.get("/:id", getChatHistory);

export default router;