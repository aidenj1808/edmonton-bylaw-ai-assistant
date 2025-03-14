import express from "express";

import { getChatHistory, storeChat, createConversation, updateConversation} from "../controllers/chatsController.js"; 

const router = express.Router();

router.post("/", createConversation);
router.post("/chat/", storeChat);
router.put("/:conversationReference", updateConversation);

export default router;