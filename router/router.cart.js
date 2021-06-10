const express = require("express")
const cartModels = require("../model/cart-models")
const productModels = require("../model/product-models")
const mongoose = require("mongoose")
const verify = require("./middleware/verifyToken")
const router = express.Router()

router.get("/", async ( req,res ) => {
    try {
        const cart = await cartModels.find();
        res.json(cart)
    } catch ( err ) {
        res.json({ message : err })
    }  
})

router.post("/", async (req,res) => {
    const product = await productModels.findById(req.params.productId)
    const newProduct = req.body
    console.log(newProduct)
    const cart = new cartModels({
        _id : new mongoose.Types.ObjectId(),
        productId : req.body.productId,
        title : req.body.title,
        details: req.body.details,
        imageURL : req.body.imageURL,
        price : req.body.price,
        netPrice : req.body.netPrice,
        discount : req.body.discount,
        category : req.body.category,
        inStock : req.body.inStock,
        fastDelivery : req.body.fastDelivery,
        brand : req.body.brand,
        ratings : req.body.ratings,
        quantity : req.body.quantity,
    })
    try {
        const savedCart = await cart.save()
        res.status(201).json(savedCart)
    }catch(error){
        res.status(500).json({
            message : "Failed to save cart items",
            error : error
        })
    }
})

router.get('/:cartId', async ( req, res) => {
    try{
        const cartItem = await cartModels.findById( req.params.cartId )
        res.status(200).json(cartItem)
    }catch(error){
        res.status(500).json({
            message : "Cart item not found",
            error : error
        })
    }
})

router.delete("/:cartId", async (req, res) => {
    try{
        const removeItemFromCart = await cartModels.remove({ _id : req.params.cartId })
        if(!removeItemFromCart){
            res.status(404).message("Item not found")
        }
        res.status(200).json(removeItemFromCart)
    }catch(error){
        res.status(500).json({
            message : error
        })
    }
    
})

router.patch('/:cartId', async (req, res) => {
    try {
      const updatedProduct = await Cart.updateOne({ _id: req.params.cartId }, {
        $set: { qty: req.body.quantity }
      })
      res.json(updatedProduct)

    } catch (err) {
      res.status(500).json({ message : error });
    }
  })
module.exports = router