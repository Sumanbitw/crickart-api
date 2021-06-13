const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
require("dotenv/config")

const User = require("../model/user-models");


router.get("/", (req, res) => {
  res.send("lets login");
});

router.get("/", async (req, res) => {
  try{
    const user = await User.find()
    res.status(200).json(user)
  }catch(error){
    res.status(404).json({ message : error })
}
})

router.post("/", async (req, res) => {
  console.log(req.body)

  const user = await User.findOne({ email: req.body.email });
  if (user) { 
    res.status(400).send("Email already exist, Log in");
  }else{  
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.send({ user: savedUser, success : true, message : "Signedup successfully" });
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
}
})

router.post("/login", async (req, res) => {
  
  const user = await User.findOne({ email: req.body.email });
  if(user){
    user.password === password 
    ? res.json({ user, success : true, message : "Logged in successfull" }) 
    : res.json({ user : null, success : false, message : "Invalid Password. Please try again"})
  }
  res.json({ user:null, success: false, message : "No account exist with the entered email id" })
})


module.exports = router