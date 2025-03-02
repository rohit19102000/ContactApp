import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, theme = "dark" } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // Create new user with default theme
    const newUser = new User({ name, email, password, theme });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Controller
export const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

// Protected Profile Controller
export const getProfile = (req, res) => {
  res.json({ message: "Protected route accessed", userId: req.user.userId });
};


// Get User's Theme
export const getTheme = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming authentication middleware sets req.user
    const user = await User.findById(userId);
    res.json({ theme: user.theme || "dark" });
  } catch (err) {
    res.status(500).json({ message: "Failed to get theme" });
  }
};

// Update User's Theme
export const updateTheme = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { theme } = req.body;
    const user = await User.findByIdAndUpdate(userId, { theme }, { new: true });
    res.json({ theme: user.theme });
  } catch (err) {
    res.status(500).json({ message: "Failed to update theme" });
  }
};