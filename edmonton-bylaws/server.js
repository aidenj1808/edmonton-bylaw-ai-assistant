import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import  connectDB from "./src/config/db.js";
// Import route files
import userRoutes from "./src/routes/users.js";
import dbUsersRoute from "./src/routes/dbUsers.js";

dotenv.config();


const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

connectDB();

// Use the routes with appropriate prefixes
app.use("/users", userRoutes);
app.use("/dbUsers", dbUsersRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`REST API is running at http://localhost:${PORT}`);
});