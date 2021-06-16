const mongoose = require("mongoose")

const WishlistSchema = mongoose.Schema ({
productId : { type : mongoose.Schema.Types.ObjectId, ref: "Product" },
userId : { type : mongoose.Schema.Types.ObjectId, ref : "User" },
}, {timestamps : true }
)

module.exports = mongoose.model("Wishlist", WishlistSchema)