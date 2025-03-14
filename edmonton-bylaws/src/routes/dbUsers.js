import express from "express";

import {createDBUser, getDBUserByEmail, updateDBUser} from "../controllers/dbUsersController.js"

const router = express.Router();

router.get("/:email", getDBUserByEmail);
router.post("/", createDBUser);
router.put("/:email", updateDBUser);

export default router;