import User from "../models/User.js";
import Conversation from "../models/Conversation.js";
import mongoose from "mongoose";


// Get User by Email
export const getDBUserByEmail = async (req, res) => {
  // start session
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    const email = req.params.email.trim(); // Extract email from URL parameters
    const user = await User.findOne({email: email}).session(session);
    if (!user) return res.status(404).json({ message: "User not found" });

    // end session
    await session.commitTransaction();
    session.endSession();
    res.json(user);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

// Create New User
export const createDBUser = async (req, res) => {
  // start session
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    const newUser = new User(req.body);
    await newUser.save({session});

    // end session
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "User Created", user: newUser });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

// Update User by ID
export const updateDBUser = async (req, res) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  const oldEmail = req.params.email;
  const newEmail = req.body.email;

  try {
    // Step 1. Find and update users email
    const updatedUser = await User.findOneAndUpdate({email: oldEmail}, req.body, {
      new: true,
      runValidators: true,
    }).session(session);
    // Check if update was successful
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    else{
      if(oldEmail !== newEmail){ // Only update conversation if email was changed
      // Step 2. Update all conversations to match updated email
      const conversations = await Conversation.find({userEmail: oldEmail}).session(session);

      if (!conversations) return res.status(404).json({ message: "User has no conversation" });

      // Update all conversation objects
      for(const conversation of conversations){
        conversation.userEmail = newEmail;
        await conversation.save({session})
      }
      }
    }
    // end session
    await session.commitTransaction();
    session.endSession();
    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // Handle duplicate key error (e.g., trying to set email to a value already taken)
    if (error.code === 11000) { // 11000 is the duplicate key error code
      return res.status(400).json({ message: "Email already in use" });
    }
    // Other errors
    res.status(500).json({ message: error.message });
  }
};

