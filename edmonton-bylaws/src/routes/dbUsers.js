import express from "express";

import {createDBUser, getDBUsers, getDBUserByEmail, updateDBUser, deleteDBUser} from "../controllers/dbUsersController.js"

console.log("Route file loaded..."); // Add this log to check if the file is loaded

const router = express.Router();

router.get("/", getDBUsers);
router.get("/:email", getDBUserByEmail);
router.post("/", createDBUser);
router.put("/:email", updateDBUser);
router.delete("/:id", deleteDBUser);

export default router;