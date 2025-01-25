const mongoose = require('mongoose');
require('dotenv').config();
  const connectDB = async () => {
    try {
      const mongoURI = process.env.MONGO_URI || 'mongodb+srv://28vanshjain:vansh%402002@kohina1.ujlok.mongodb.net/?retryWrites=true&w=majority&appName=kohina1';
      await mongoose.connect(mongoURI);
      console.log('MongoDB Connected...');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1); // Exit process with failure
    }
  };
  
  module.exports = connectDB;
  