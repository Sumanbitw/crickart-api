const jwt = require("jsonwebtoken")
require("dotenv/config")

module.exports = (req, res, next) => {
    try{
    const token = req.headers("auth-token")    
    const decoded = jwt.verify(token,process.env.JWT__TOKEN) 
    req.useData = decoded
    next()
    }catch(error){
        res.status(401).json({
            message : "Auth failed"
        })
    }
}