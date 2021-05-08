const { Wishlist } = require("../models/wishlist.model");

const getAllWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({}).populate("_id");
    const normalizedWishlistItems = wishlistItems.map((item) => {
      const { _id, ...doc } = item._id._doc;
      return { _id: _id, ...doc };
    });
    res.json({
      success: true,
      wishlistItems: normalizedWishlistItems,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Can't retrieve wishlist data from server",
      errorMessage: err.message,
    });
  }
};

const addWishlistItem = async (req, res) => {
  const wishlistItem = req.body;
  const wishlistItemToAdd = new Wishlist(wishlistItem);
  try {
    const addedWishlistItem = await wishlistItemToAdd.save();
    res.status(201).json({
      success: true,
      wishlistItem: addedWishlistItem,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      errorMessage: err.message,
    });
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const { wishlistItem } = req;
    await wishlistItem.remove();
    res.json({
      success: true,
      wishlistItem,
    });
  } catch (err) {
    res.json({
      success: false,
      errorMessage: err.message,
    });
  }
};

module.exports={
  getAllWishlistItems,
  addWishlistItem,
  deleteWishlistItem
}