const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required:"Product name is required",
    },
    price: {
      type: Number,
      required: "Product price is required",
    },
    description: {
      type: String,
      required: "Product description is required",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    inStock: {
      type: Boolean,
      required: "Avalibility is required",
    },
    fastDelivery: {
      type: Boolean,
      required: "Avalibility is required",
    },
    imageUrl: {
      type: String,
      required: "image url is required",
    },
    ratings:{
      type: Number,
      min: [1, "Product Ratings cannot be less than 1"],
      max: [5, "Product Ratings cannot be more than 1"],
      required: "Product Rating is required",
    },
    offer:{
      type:String
    },
    language:{
      type:String,
      required:"Language is required"
    }
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };