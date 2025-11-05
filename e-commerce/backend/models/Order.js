const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  productName: String,
  quantity: Number,
  totalPrice: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
