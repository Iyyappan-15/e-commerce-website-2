const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const viewCustomerRoutes = require('./routes/viewCustomerRoutes');
const app = express();

//  Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '../Shop-Accessories/images')));

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerceDB')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

//Routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/viewcustomers', viewCustomerRoutes);

// Route to get total customer count 
app.get('/api/customers/count', async (req, res) => {
  try {
    const Customer = require('./models/User'); 
    const count = await Customer.countDocuments();
    res.json({ totalCustomers: count });
  } catch (error) {
    console.error("Error fetching customer count:", error);
    res.status(500).json({ message: "Error fetching customer count" });
  }
});

// Default route 
app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

// Dashboard summary route 
app.get('/api/dashboard/summary', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const User = require('./models/User'); 
    const Order = require('./models/Order');

    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments(); 
    const totalOrders = await Order.countDocuments();

    res.json({
      totalProducts,
      totalCustomers,
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
});

//  Fetch all customers 
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await db.collection("users").find().toArray();
    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});
// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
