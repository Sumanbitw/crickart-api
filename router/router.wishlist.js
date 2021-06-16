const express = require("express")
const wishlistModels = require("../model/wishlist-models")
const productModels = require("../model/product-models")
const verify = require("./middleware/verifyToken")
const router = express.Router()

router.get("/:userId", async ( req,res ) => {
    try {
        const { userId } = req.params
        const userWishlist = await wishlistModels.find({ user : {_id : userId } }).populate('productId').exec();
        res.json({ cart : userWishlist, success : true })
    } catch ( error ) {
        res.json({ message : error, success : false  })
    }   
})

router.post("/", async (req,res) => {
    try {
        const newWishlist = new wishlistModels(req.body)
        const savedWishlist = await newWishlist.save()
        res.status(201).json({cart : savedWishlist, success:true, message : "Added in cart"})
    }catch(error){
        res.status(500).json({
            success : false,
            message : "Failed to add cart items",
            error : error
        })
    }
})


router.delete("/:userId/:productId",async (req, res) => {
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