const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")

const stripe = require("stripe")(process.env.SECRET_KEY);
const uuid = require("uuid");

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
const signupRoute = require("./router/signup.router")
const loginRoute = require("./router/login.router")

app.get("/",(req,res) => {
    res.send("Ecommerce backeend")
})

app.post("/payment", (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT ", product);
    console.log("PRICE ", product.price);
    const idempontencyKey = uuid();
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: product.price,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
              name: token.card.name,
              address: {
                country: token.card.address_country
              }
            }
          },
          { idempontencyKey }
        );
      })
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err));
  });
  
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true, useUnifiedTopology:true}, () =>{
    console.log("connected to db")
})
app.use("/product", productRoute)
app.use("/cart", cartRoute)
app.use("/wishlist", wishlistRoute)
app.use("/signup", signupRoute)
app.use("/login", loginRoute)



app.listen(port)