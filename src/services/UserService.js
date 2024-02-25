const { ObjectId } = require('mongodb');
const User = require('../models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const tokenSecret = process.env.TOKEN_SECRET;

const { createVerifyToken } = require('../utils/TokenUtils');

const getService = async(id) => {
  try {
      const user = await User.findById(new ObjectId(id));
      return user;
    } catch (e) {
        console.log(e);
    }
}

const listService = async() => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    console.log(error);
  }
}

const createService = async({username, email, password}) => {
  try {
    const token = createVerifyToken(); // used to verify account through email on creation
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

const updateService = async(id, username, email, password) => {
  try {
    const emailExists = await User.findOne({ _id: { $ne: id }, email: email });
    if (emailExists) {
      return {error: 'Email already exists'};
    }
    const usernameExists = await User.findOne({ _id: { $ne: id }, username: username });

    if (usernameExists) {
      return {error: 'Username already exists'};
    }

    const user = await User.findByIdAndUpdate(new ObjectId(id), {username, email, password});
    if (user) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

const loginService = async(email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user && user.isActive) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = jwt.sign({email, id: new ObjectId(user._id)}, tokenSecret, {expiresIn: '24h'});
        
        return {token};
      } else {
        return {error: 'Invalid Credentials'};
      }
    } else {
      return {error: 'Could not find user'};
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getService, listService, createService, updateService, loginService };