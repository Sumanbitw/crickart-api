const mongoose = require("mongoose")

const WishlistSchema = mongoose.Schema ({
    user : String,
    wishlist : [],
    date : {
        type : Date,
        default : Date.now,
    }
})

module.exports = mongoose.model("wishlist", WishlistSchema)