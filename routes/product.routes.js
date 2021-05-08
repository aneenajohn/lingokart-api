const express = require("express");
const productRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller.js");
const {
  productParamHandler,
} = require("../controllers/param.controller.js");


productRouter.route("/").get(getAllProducts);

productRouter.param("productId", productParamHandler);
productRouter.route("/:productId")
.get(getProductById)
.post(updateProduct)
.delete(deleteProduct);

module.exports = { productRouter };
