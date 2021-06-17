const express = require("express")
const wishlistModels = require("../model/wishlist-models")
const productModels = require("../model/product-models")
const verify = require("./middleware/verifyToken")
const router = express.Router()

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userWishlist = await wishlistModels.find({ user : { _id : userId } }).populate('productId').exec();
        res.json({ wishlist : userWishlist, success : true })
    } catch ( error ) {
        res.json({ message : error, success : false  })
    }   
})

router.post("/", async (req,res) => {
    const { userId, productId } = req.params
    try {
        const newWishlist = new wishlistModels(req.body)
        const savedWishlist = await newWishlist.save()
        res.status(201).json({wishlist : savedWishlist, success:true, message : "Added in wishlist"})
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Failed to add wishlist items",
            error : error
        })
    }
})


router.delete("/:userId/:productId",async (req, res) => {
    try{
        const removeItemFromWishlist = await wishlistModels.remove({user : userId, product : productId})
        res.status(200).json({ success : true, message : "Item is removed", wishlist : removeItemFromWishlist})
    }catch(error){
        res.status(500).json({
            message : error,
            success : false
        })
    }
    
})

module.exports = router