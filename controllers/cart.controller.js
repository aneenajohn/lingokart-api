const express = require("express");
const { extend } = require("lodash")
const { Cart } = require("../models/cart.model")
const { Product } = require("../models/product.model")
const router = express.Router();


const getAllCartItems = async (req, res) => {
  try {
    const user = req.user;
    let cartItems = user.cart
    // let cartItems = await Cart.find({}).populate("_id");
    // let cartItems = await Cart.find({userId}).populate("_id");
    const normalizedCartItems = cartItems.map(item => {
      const { _id, ...doc } = item._id._doc;
      return { _id: _id, ...doc, quantity: item.quantity };
    });
    res.json({
      success: true,
      cartItems: normalizedCartItems,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Cart Items cant be retrieved from server",
      errorMessage: err.message,
    });
  }
};

const addCartItem = async (req, res) => {
  const user = req.user;
  const cartItemToAdd = req.body;
  // const { userId } = req;
  const newCartItem = new Cart(cartItemToAdd);
  try {
    const addedCartItem = await newCartItem.save();
    user.cart.push(addedCartItem._id);
    res.status(201).json({
      success: true,
      cartItem: addedCartItem,
    });
  } catch (err) {
    res.json({
      success: false,
      errorMessage: err.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  let { cartItem } = req;
  const { quantity } = req.body;
  try{
    if (quantity) {
    cartItem.quantity = quantity;
    const updatedCartItem = await cartItem.save();
    return res.json({
      success: true,
      cartItem: updatedCartItem
    });
  }
  const updatedCartItem = await cartItem.remove();
    res.json({
      success: true,
      cartItem: updatedCartItem
    });
  }
  catch (err) {
    res.json({
      success: false,
      errorMessage: err.message,
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const user = req.user;
    const { cartItem } = req;
    user.cart.pull(cartItem._id);
    await cartItem.remove();    
    res.json({
      success: true,
      cartItem
    });
  } catch (err) {
    res.json({
      success: false,
      errorMessage: err.message
    });
  }
};

module.exports= {
  getAllCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem
  }