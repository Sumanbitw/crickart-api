const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema ({
    title : {
        type : String,
        required : true
    },
    details: {
        type : [String],
        required : true
    },
    imageURL : { 
        type : [String],
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    netPrice : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    inStock : {
        type : Boolean,
        required : true
    },
    fastDelivery : {
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model("posts", ProductSchema)