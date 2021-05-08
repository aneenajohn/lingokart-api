const express = require("express");

const {
  getAllWishlistItems,
  addWishlistItem,
  deleteWishlistItem,
} = require("../controllers/wishlist.controller");

const {
  wishlistParamHandler,
} = require("../controllers/param.controller");

const wishlistRouter = express.Router();

wishlistRouter.route("/")
.get(getAllWishlistItems)
.post(addWishlistItem);

wishlistRouter.param("wishlistId", wishlistParamHandler);

wishlistRouter.route("/:wishlistId")
.delete(deleteWishlistItem);


module.exports = { wishlistRouter };