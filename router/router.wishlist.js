const express = require("express")
const wishlistModels = require("../model/wishlist-models")
const router = express.Router()

router.get("/", async ( req,res ) => {
    try {
        const wishlist = await wishlistModels.findOne({user:req.body.user});
        res.json(wishlist)
    } catch ( err ) {
        res.json({ message : err })
    }  
})

//post
router.post("/", async (req,res) => {
    try {
        const savedWishlist = await wishlistModels.findOneAndUpdate(
            { user:req.body.user },
            { wishlist:req.body.wishlist },
            null,
            async function ( err , result ) {
                if(!result) {
                    const wishlist = new wishlistModels({
                        user:req.body.user,
                        wishlist:req.body.wishlist,
                    })
                    try {
                        const savedWishlist = await wishlist.save()
                        res.json(savedWishlist)
                    } catch( err)  {
                        res.status(400).json({ message : err })
                    }
                }
            }
        );
        res.send(savedWishlist)
    } catch (err) {
        res.status(400).json({ message:err })
}
})

module.exports = router