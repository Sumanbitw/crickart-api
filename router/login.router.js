const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email });
    if(user){
      user.password === password 
      ? res.json({ user, success : true, message : "Logged in successfull" }) 
      : res.json({ user : null, success : false, message : "Invalid Password. Please try again"})
    }
    res.json({ user:null, success: false, message : "No account exist with the entered email id" })
  })
  
  
  module.exports = router