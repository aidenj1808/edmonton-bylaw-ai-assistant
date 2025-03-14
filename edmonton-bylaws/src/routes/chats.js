import express from "express";

import { getChatHistory, storeChat } from "../controllers/chatsController.js"; 

const router = express.Router();

router.post("/", storeChat);

export default router;