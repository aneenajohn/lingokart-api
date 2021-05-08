const express = require("express");
const cartRouter = express.Router();
const {
  getAllCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem } = require("../controllers/cart.controller");
const { cartParamHandler } = require("../controllers/param.controller");

cartRouter.route("/")
  .get(getAllCartItems)
  .post(addCartItem);

cartRouter.param("cartId", cartParamHandler);
cartRouter.route("/:cartId")
.post(updateCartItem)
.delete(deleteCartItem);


module.exports = { cartRouter };