'use strict';
/**
 * user.js
 *
 * Contains the definition for a new 'User' data model
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  regNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // Checks if it consists of numerals alone
    // TODO: Look for a way to use regular expressions to make the
    // validation more precise and accurate.
    validate(value) {
      if (!validator.isNumeric(value, {no_symbols: true})) {
        throw new Error('Registration number consists of numerals only');
      }
    }
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate(value) {
      // Checks if it's a nigerian phone number
      if (!validator.isMobilePhone(value, 'en-NG')) {
        throw new Error('Not a valid phone number');
      }
    }
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Not a valid email');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET);

  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (regNumber, email, password) => {
  const user = await User.findOne({regNumber, email});
  console.log(user);
  if (!user) {
    throw new Error('Unable to login');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
