const express = require("express")
const cartModels = require("../model/cart-models")
const productModels = require("../model/product-models")
const mongoose = require("mongoose")
const verify = require("./middleware/verifyToken")
const router = express.Router()

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userCart = await cartModels.find({ user : {_id : userId } }).populate('productId').exec();
        res.json({ cart : userCart, success : true })
    } catch ( err ) {
        res.json({ message : err, success : false  })
    }  
})

router.post("/", async (req,res) => {
    try {
        const newcart = new cartModels(req.body)
        const savedCart = await newcart.save()
        res.status(201).json({cart : savedCart, success:true, message : "Added in cart"})
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Failed to add cart items",
            error : error
        })
    }
})

router.post('/:userId/:productId', async ( req, res) => {
    const { userId, productId } = req.params
    const { quantity } = req.body
    try{
        const updatedCart = quantity === 1 ? await cartModels.findOneAndRemove({ user : { _id : userId }, product : {_id : productId }})
        : await cartModels.findOneAndUpdate({ user : { _id : userId }, product : { _id : productId }}, { quantity })
        res.json({ success : true, updatedCart : updatedCart, message : "Items added in cart "})
    }catch(error){
        res.status(500).json({
            message : "Cart item not found",
            error : error
        })
    }
})


module.exports = router