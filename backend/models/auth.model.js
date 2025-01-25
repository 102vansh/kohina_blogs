const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define user roles
        default: 'user',
      },
    
},{timestamps: true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }

    try {
      this.password = await bcrypt.hash(this.password, 10);
    }catch (error) {
      return next(error);
    }
  });
  userSchema.methods.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  };
userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  };
  module.exports = mongoose.model('User', userSchema);