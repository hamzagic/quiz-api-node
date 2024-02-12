const {ObjectId} = require('mongodb');
const User = require('../models/User');

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
    const newUser = new User({username, email, password});
    await newUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

const updateService = async(id, {username, email, password}) => {
  try {
    const user = await User.findById(new ObjectId(id));
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
  } catch (error) {
    console.log(error);
  }

}

module.exports = { getService, listService, createService, updateService };