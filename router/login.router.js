const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
require("dotenv/config")
const User = require("../model/user-models")

// router.post("/", async (req, res) => {
//     const { email, password } = req.body
//     const user = await User.findOne({ email: email });
//     if(user){
//       user.password === password 
//       ? res.json({ user, success : true, message : "Logged in successfull" }) 
//       : res.json({ user : null, success : false, message : "Invalid Password. Please try again"})
//     }
//     res.json({ user:null, success: false, message : "No account exist with the entered email id" })
//   })

  router.post('/',async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email })
    !user && res.json({ sucess : false, message : "Incorrect email" })
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    !validatePassword && res.json({ success : false, message : "Wrong Password" })
    
    try{
        let token = jwt.sign({ userId : user._id, email : user.email }, 
        process.env.JWT__TOKEN, {expiresIn : "1d"})
    
        token=`Bearer ${token}`;
        res.json({ success : true, message : "Succesfully login", user : user, token : token})
        }catch(error) {
            res.json({ success :false, error : error, message : "Invalid login credentials"  })
        }
    })
    
  
  
  module.exports = router