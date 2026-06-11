const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../config/config");

const generateToken = (userId) => {
  return jwt.sign({ userId }, configs.JWT_SECRET, { expiresIn: "7d" });
};

const crateUsers = async (userData) => {
  console.log(userData)
  try {
    let { fullName, email, password } = userData;
    const isUserexist = await User.findOne({ email });

    if (isUserexist) {
      throw new Error("user already exist with email:", email);
    }

    password = await bcrypt.hash(password, 8);
    const user = await User.create({ fullName, email, password });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const finduserbyId = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user does not found id :", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const finduserbyEmail = async(email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user does not found email:", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  crateUsers,
  finduserbyEmail,
  finduserbyId,
  generateToken,
  getAllUsers,
};
