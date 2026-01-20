const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donorName: { type: String },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['success', 'pending', 'failed'], 
    required: true 
  },
  transactionId: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
