const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Add customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully', customer: newCustomer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
