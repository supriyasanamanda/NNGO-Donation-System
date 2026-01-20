
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/User');
const Donation = require('./models/Donation');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ngo_demo');

// Register
app.post('/register', async (req,res)=>{
  const user = await User.create(req.body);
  res.json(user);
});

// Login (mock)
app.post('/login', async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  res.json(user);
});

// Donate (mock payment)
app.post('/donate', async (req,res)=>{
  const statuses = ['SUCCESS','FAILED','PENDING'];
  const status = statuses[Math.floor(Math.random()*3)];
  const donation = await Donation.create({
    userId: req.body.userId,
    amount: req.body.amount,
    status,
    transactionId: 'TXN_'+Date.now()
  });
  res.json(donation);
});

// Admin view
app.get('/admin/donations', async (req,res)=>{
  res.json(await Donation.find());
});

app.listen(5000, ()=>console.log('Server running'));
