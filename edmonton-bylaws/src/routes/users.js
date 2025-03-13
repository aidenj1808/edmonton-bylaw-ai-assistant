// routes/users.js
import  express from "express";
import {getUsers, getUserByEmail, createUser, updateUser, deleteUser } from "../controllers/usersController.js"

const router = express.Router();

router.get("/", getUsers);
router.get("/:email", getUserByEmail);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;