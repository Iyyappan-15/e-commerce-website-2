const mongoose = require('mongoose');
const fs = require('fs');
const Product = require('./models/Product');

async function importData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    // adjust path to your JSON file
    const products = JSON.parse(fs.readFileSync('../Shop-Accessories/Frontend/products.json', 'utf-8'));
    await Product.deleteMany(); 
    await Product.insertMany(products);
    console.log('✅ Products imported successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error importing products:', error);
  }
}
importData();
