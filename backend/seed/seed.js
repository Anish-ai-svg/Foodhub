require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });const mongoose = require('mongoose');
const Food = require('../models/Food');
const User = require('../models/User');
const foods = require('./seedData');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing food
    await Food.deleteMany();
    console.log('Cleared existing food items');

    // Insert seed food
    await Food.insertMany(foods);
    console.log(`Inserted ${foods.length} food items`);

    // Create admin user if not exists
    const adminEmail = 'admin@foodhub.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@foodhub.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
