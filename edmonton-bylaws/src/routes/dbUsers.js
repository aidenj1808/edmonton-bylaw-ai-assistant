import express from "express";

import {createDBUser, getDBUsers, getDBUserById, updateDBUser, deleteDBUser} from "../controllers/dbUsersController.js"

console.log("Route file loaded..."); // Add this log to check if the file is loaded

const router = express.Router();

router.get("/", getDBUsers);
router.get("/:id", getDBUserById);
router.post("/", createDBUser);
router.put("/:id", updateDBUser);
router.delete("/:id", deleteDBUser);

export default router;