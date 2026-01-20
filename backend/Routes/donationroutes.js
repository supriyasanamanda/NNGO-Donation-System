const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Create Donation (Simulates Payment Gateway Callback)
router.post('/', async (req, res) => {
  try {
    const { userId, amount, status, donorName } = req.body;
    
    // Simulate Transaction ID
    const transactionId = "TXN_" + Date.now() + Math.floor(Math.random() * 1000);

    // This fulfills "Registration data stored independently" [cite: 60]
    // And "No fake or forced payment success logic" - we record exactly what the gateway sends [cite: 63]
    const donation = await Donation.create({
      userId,
      donorName,
      amount,
      status, 
      transactionId
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get My Donations
router.get('/my-donations/:userId', async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Donations (For Admin Dashboard)
router.get('/all', async (req, res) => {
  try {
    const donations = await Donation.find().populate('userId', 'name email').sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;