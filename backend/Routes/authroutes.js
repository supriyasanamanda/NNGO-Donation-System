const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if this is the hardcoded superadmin
    let role = 'user';
    if(email === process.env.SUPER_ADMIN_EMAIL) role = 'superadmin';

    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, permissions: user.permissions } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users (For Admin/Superadmin)
router.get('/users', async (req, res) => {
  try {
    // In production, add middleware to verify admin token here
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Permissions (Superadmin only)
router.put('/update-role', async (req, res) => {
  try {
    const { userId, permissions, role } = req.body;
    // In production, verify req.user.role === 'superadmin'
    await User.findByIdAndUpdate(userId, { permissions, role });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;