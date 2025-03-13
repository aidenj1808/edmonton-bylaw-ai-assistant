import User from "../models/User.js";


// Get User by Email
export const getDBUserByEmail = async (req, res) => {
  try {
    const email = req.params.email.trim(); // Extract email from URL parameters
    console.log("Searching for user with email:", {email:email}); 

    const user = await User.findOne({email: email});
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
    const updatedUser = await User.findOneAndUpdate({email: req.params.email}, req.body, {
      new: true,
      runValidators: true,
    });
    // Check if update was successful
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle duplicate key error (e.g., trying to set email to a value already taken)
    if (error.code === 11000) { // 11000 is the duplicate key error code
      return res.status(400).json({ message: "Email already in use" });
    }
    // Other errors
    res.status(500).json({ message: error.message });
  }
};

