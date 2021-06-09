const mongoose = require("mongoose")

const CartSchema = mongoose.Schema ({
    _id : mongoose.Schema.Types.ObjectId,
    productId : { type : mongoose.Schema.Types.ObjectId, ref: "Product" },
    title : { type : String, required : true },
    details: { type : String, required : true },
    imageURL : { type : [String], required : true },
    price : { type : Number, required : true },
    netPrice : { type : Number, required : true },
    discount : { type : Number, required : true },
    category : { type : String, required : true },
    inStock : { type : Boolean, required : true },
    fastDelivery : { type : Boolean, required : true },
    brand : { type : String, required: true },
    ratings : { type : String, required: true },
    quantity : { type : Number, required : true }
}, {timestamps : true }
)

module.exports = mongoose.model("Cart", CartSchema)