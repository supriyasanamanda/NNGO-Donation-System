
const mongoose = require('mongoose');
module.exports = mongoose.model('Donation', new mongoose.Schema({
  userId:String,
  amount:Number,
  status:String,
  transactionId:String,
  createdAt:{type:Date,default:Date.now}
}));
