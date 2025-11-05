const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add user 
router.post('/add', async (req, res) => {
  try {
    const { name, password } = req.body;
    const newUser = new User({ name, password });
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
