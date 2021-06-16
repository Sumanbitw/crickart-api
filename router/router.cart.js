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

router.delete("/:userId/:productId", async (req, res) => {
    const { userId, productId } = req.params
    try {
        const removedCartItem = await cartModels.remove({ user : userId, productId : productId })
        console.log(removedCartItem)
        res.json({ success : true, message : "Items removed", removedCartItem : removedCartItem })
    }catch(error){
        res.json({
            success : false,
            message : "Error while removing the item from cart"
        })
    }
})

router.patch("/:userId/:productId", async (req, res) => {
    const { userId, productId } = req.params
    const { quantity } = req.body
    try {
        const updateCartItem = await cartModels.updateOne({ user : userId, productId : productId }, { $set : { quantity : quantity }})
        console.log(updateCartItem)
        res.json({ success : true, message : "Items updated in cart", updateCartItem : updateCartItem })
    }catch(error){
        res.json({
            success : false,
            message : "Error while removing the item from cart"
        })
    }
})

module.exports = router