const express = require("express")
const wishlistModels = require("../model/wishlist-models")
const productModels = require("../model/product-models")
const verify = require("./middleware/verifyToken")
const router = express.Router()

router.get("/",verify, async ( req,res ) => {
    console.log(req.user)
    try {
        const wishlist = await wishlistModels.find();
        res.json(wishlist)
    } catch ( error ) {
        res.json({ message : error })
    }  
})

router.post("/",verify, async (req,res) => {
    const product = await productModels.findById(req.params.productId)
    if(!product) {
        res.status(404).json({
            message : "There was nothing in the cart. Please add."
        })
    }
    const wishlist = new wishlistModels({
        _id : new mongoose.Types.ObjectId(),
        productId : req.body.productId,
        userId : req.body.userId,
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
        const savedWishlist = await wishlist.save()
        res.status(201).json(savedWishlist)
    }catch(error){
        res.status(500).json({
            message : error
        })
    }
})

router.get('/:wishlistId', verify, async ( req, res) => {
    try{
        const wishlistItem = await wishlistModels.findById( req.params.wishlistId )
        res.status(200).json(wishlistItem)
    }catch(error){
        res.status(500).json({
            message : error
        })
    }
})

router.delete("/:wishlistId",verify, async (req, res) => {
    try{
        const removeItemFromWishlist = await wishlistModels.remove({ _id : req.params.wishlistId })
        if(!removeItemFromWishlist){
            res.status(404).message("Item not found")
        }
        res.status(200).json(removeItemFromWishlist)
    }catch(error){
        res.status(500).json({
            message : error
        })
    }
    
})

module.exports = router