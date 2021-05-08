const { extend } = require("lodash");
const { Product } = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try{
    const products = await Product.find({});
  res.json({
    success: true,
    products,
    });
  }
  catch (err) {
    res.json({
      success: false,
      errorMessage: err.message,
    });
  };
}

const getProductById = (req, res) => {
  try{
        res.json({
        success: true,
        product: req.product,
      });
  }
  catch (err) {   
    res.json({
      success: false,
      errorMessage: err.message,
    });
  };
}

const updateProduct = async (req, res) => {
  try{
      const updateProduct = req.body;
      let { product } = req;
      product = extend(product, updateProduct);
      const updatedProduct = await product.save();
      res.json({
        success: true,
        product: updatedProduct,
      });
  }
  catch (err) {
    res.json({
      success: false,
      errorMessage: err.message,
    });
  }

}

const deleteProduct = async (req, res) => {
   try{
      let { product } = req;
      await product.remove();
      res.json({ success: true, product })
   }
   catch (err) {
    res.json({
      success: false,
      errorMessage: err.message,
    });
  }
}

module.exports= {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
}

