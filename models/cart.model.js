const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number
    },
});

const Cart = mongoose.model("Cart", cartItemSchema);
module.exports = { Cart };