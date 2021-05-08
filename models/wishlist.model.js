const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistItemSchema = new Schema({
  _id: { 
    type: Schema.Types.ObjectId, 
    ref: "Product" 
    },
});


const Wishlist = mongoose.model("Wishlist", wishlistItemSchema);

module.exports = { Wishlist };

