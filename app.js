const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}
))

const productRoute = require("./router/router.product")
const cartRoute = require("./router/router.cart")
const wishlistRoute = require("./router/router.wishlist")

app.get("/",(req,res) => {
    res.send("hello express")
})

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true, useUnifiedTopology:true}, () =>{
    console.log("connected to db")
})
app.use("/product", productRoute)
app.use("/cart",cartRoute)
app.use("/wishlist",wishlistRoute)

app.listen(port)