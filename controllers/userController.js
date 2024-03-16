
const jwt = require('jsonwebtoken');
const User = require('../models/userschema');
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    const savedUser = await user.save();

    res.status(200).json({ savedUser  });
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ msg: "invalid email or password" });
    }
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, token });
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

const updateScores = async (req, res) => {
  try {
    const user = await User.findById(req.currUserId);
    user.score += 1;
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getHighScores = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.send(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

module.exports = { createUser, updateScores, signInUser, getHighScores };
