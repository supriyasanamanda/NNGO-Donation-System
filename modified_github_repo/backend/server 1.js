const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');
const Donation = require('./models/Donation');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ngo_demo');

// Register: Data is saved independently of donation status [cite: 17, 60]
app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) { res.status(400).json({ error: "Registration failed" }); }
});

// Login: Supports role-based redirection [cite: 21]
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (user) {
    res.json(user); // Returns role (USER or ADMIN)
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Donation Flow: Tracks attempts and assigns status [cite: 26, 27]
app.post('/donate', async (req, res) => {
  const statuses = ['SUCCESS', 'FAILED', 'PENDING'];
  const status = statuses[Math.floor(Math.random() * 3)];
  const donation = await Donation.create({
    userId: req.body.userId,
    amount: req.body.amount,
    status,
    transactionId: 'TXN_' + Date.now()
  });
  res.json(donation);
});

// User History: Let users see their own history [cite: 30]
app.get('/user/donations/:userId', async (req, res) => {
  const history = await Donation.find({ userId: req.params.userId });
  res.json(history);
});

// Admin Dashboard: View all records [cite: 49, 56]
app.get('/admin/all-data', async (req, res) => {
  const donations = await Donation.find();
  const users = await User.find();
  res.json({ donations, users });
});

app.listen(5000, () => console.log('Server running on port 5000'));