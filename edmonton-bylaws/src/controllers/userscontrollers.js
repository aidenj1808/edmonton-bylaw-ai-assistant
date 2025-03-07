import User from '../models/User.js';

// Get All Users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create New User
export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        res.status(201).json({ message: "User Created", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User by ID
export const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { firstname, lastname, email, password },
            { new: true }
        );
        
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User Updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete User by ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
