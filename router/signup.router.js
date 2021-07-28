const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
require("dotenv/config")

const User = require("../model/user-models");


// router.get("/", (req, res) => {
//   res.send("lets login");
// });

// router.get("/", async (req, res) => {
//   try{
//     const user = await User.find()
//     res.status(200).json(user)
//   }catch(error){
//     res.status(404).json({ message : error })
// }
// })

// router.post("/", async (req, res) => {
//   console.log(req.body)

//   const user = await User.findOne({ email: req.body.email });
//   if (user) { 
//     res.status(400).send("Email already exist, Log in");
//   }else{  
//   const newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   try {
//     const savedUser = await newUser.save();
//     res.send({ user: savedUser, success : true, message : "Signedup successfully" });
//   } catch (err) {
//     console.log(err)
//     res.status(400).send(err);
//   }
// }
// })

// router.post("/login", async (req, res) => {
  
//   const user = await User.findOne({ email: req.body.email });
//   if(user){
//     user.password === password 
//     ? res.json({ user, success : true, message : "Logged in successfull" }) 
//     : res.json({ user : null, success : false, message : "Invalid Password. Please try again"})
//   }
//   res.json({ user:null, success: false, message : "No account exist with the entered email id" })
// })

router.post("/", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const userExists = await User.findOne({ email : req.body.email })
  if (userExists){
      return res.json({ message : "User already exists" })
  }else {
      const user = new User({ name : req.body.name, email : req.body.email, password : hashedPassword })
      try {    
          const savedUser = await user.save()
          const token = jwt.sign({ userId : savedUser._id, email : savedUser.email
          }, process.env.JWT__TOKEN, {expiresIn : "1d"})
          console.log(savedUser)
          res.status(201).json({ success : true, message : "Account created ", token : token, user : savedUser })
      }catch(error) {
          console.log(error)
          res.status(500).json({
              success : false,
              message : "Unable to create account",
              error : error
      }) 
  }  
 }      
})

module.exports = router