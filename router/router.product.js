const express = require("express")
const productModels = require("../model/product-models")
const router = express.Router()

router.get("/", async ( req,res ) => {
    try {
        const product = await productModels.find();
        res.json(product)
    } catch ( err ) {
        res.json({ message : err })
    }  
})

//post
router.post("/", async ( req,res ) => {
    console.log( req.body )
    const product = new productModels({
        title : req.body.title,
        details : req.body.details,
        imageURL : req.body.imageURL,
        price : req.body.price,
        netPrice : req.body.netPrice,
        discount : req.body.discount,
        category : req.body.category,
        inStock : req.body.inStock,
        fastDelivery : req.body.fastDelivery
    })
    try {
        const savedProduct = await product.save();
        res.json( savedProduct )
    } catch ( err ) {
        res.json({ message : true })
    }
})
router.get("/:productId", async (req,res) => {
    try {
        const product = await productModels.findById(req.params.productId)
        res.json( product )
    } catch (err) {
        res.json({ message : err })
    }
})
router.patch("/:productId", async (req,res) => {
    try{
        const updatedProduct = await productModels.updateOne({ _id : req.params.productId }, {$set : {category:req.body.category}})
        res.json( updatedProduct )
    } catch ( err ) {
        res.json({ message : err})
    }
})

module.exports = router