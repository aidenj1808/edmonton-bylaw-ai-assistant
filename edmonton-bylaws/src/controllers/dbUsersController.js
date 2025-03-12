import User from "../models/User.js";

// Get All Users
export const getDBUsers = async (req, res) => {
  try {
    console.log("Get All Users");
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message + "Error in getDBUsers" });
  }
};

// Get User by ID
export const getDBUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create New User
export const createDBUser = async (req, res) => {
  console.log("Received request body:", req.body);  // Log the incoming request body

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User Created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User by ID
export const updateDBUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User Updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User by ID
export const deleteDBUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
