const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")
const port = process.env.PORT || 3010

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}
))

const productRoute = require("./router/router.product")
const cartRoute = require("./router/router.cart")
const wishlistRoute = require("./router/router.wishlist")
const userRoute = require("./router/auth")

app.get("/",(req,res) => {
    res.send("Ecommerce backeend")
})

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true, useUnifiedTopology:true}, () =>{
    console.log("connected to db")
})
app.use("/product", productRoute)
app.use("/cart",cartRoute)
app.use("/wishlist",wishlistRoute)
app.use("/auth", userRoute)

app.listen(port)