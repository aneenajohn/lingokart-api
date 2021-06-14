const { Product } = require("../models/product.model");
const {Cart} = require("../models/cart.model");
const {Wishlist} = require("../models/wishlist.model");
const {User} = require("../models/user.model");

const productParamHandler = async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.json({ sucess: false, message: "There is no item associated with the id provided" })
    req.product = product;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Couldnt retrieve the product from server",
      errorMessage: err.message
    });
  }
};

const cartParamHandler = async (req, res, next, cartId) => {
  try {
    const cartItem = await Cart.findById(cartId);
    if (!cartItem)
      return res.json({ sucess: false, message: "There is no item associated with the id provided" })
    req.cartItem = cartItem;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Couldnt retrieve cart details from server",
      errorMessage: err.message
    });
  }
};

const wishlistParamHandler = async (req, res, next, wishlistId) => {
  try {
    const wishlistItem = await Wishlist.findById(wishlistId);
    if (!wishlistItem)
      return res.json({ sucess: false, message: "There is no item associated with the id provided" })
    req.wishlistItem = wishlistItem;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Error in getting wishlistItem  details",
      errMessage: err.errMessage,
    });
  }
};

const userParamHandler = async (req, res, next, userId) => {
  try {
    const user = User.findById(userId)
      .select("-password -__v")
      .populate("wishlist")
      .populate("cart"); 
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in getting User details",
    });
  }
};

module.exports = {
  productParamHandler,
  cartParamHandler,
  wishlistParamHandler,
  userParamHandler
  }