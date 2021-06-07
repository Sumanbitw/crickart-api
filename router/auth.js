const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
require("dotenv/config")

const User = require("../model/user-models");
const { Mongoose } = require('mongoose');

router.get("/", (req, res) => {
  res.send("lets login");
});


router.post("/signup", async (req, res) => {
  console.log(req.body)

  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).send("Email already exist, Log In");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
     _id : mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ User: savedUser._id });
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
})

router.post("/login", async (req, res) => {
  
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Email is not found, Sign Up instead");

  const password = await bcrypt.compare(req.body.password, user.password)
  if (!password) return res.send("Incorrect password")

  const token = jwt.sign({ _id: user._id }, process.env.JWT__TOKEN);
  res.header(token).json({ token: token, user: user });
  
})


module.exports = router