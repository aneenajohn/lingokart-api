const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const {initializeDBConnection}=require("./db/db.js");
const {errorHandler }  = require("./middlewares/error-handler.middleware.js");
const {routeNotFound} = require("./middlewares/404-route-handler.middleware.js");
const { verifyAuth } = require("./middlewares/verifyAuth");

const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const {cartRouter} = require("./routes/cart.routes");
const {wishlistRouter} = require ("./routes/wishlist.routes");

const app = express();
const PORT= 4000;
app.use(cors());
app.use(bodyParser.json());

initializeDBConnection();


app.get('/', (req, res) => {
  res.json({api:'This is an api for e-commerce app'})
});

app.use("/products",productRouter);
app.use("/users", userRouter);
// app.use(verifyAuth);
app.use("/cart",verifyAuth,cartRouter);
app.use("/wishlist",verifyAuth, wishlistRouter);

// ERROR HANDLER & 404s This should be the last route,Keep it here dont move
app.use(errorHandler);
app.use(routeNotFound);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port ", PORT);
});