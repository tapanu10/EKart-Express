const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
} = require("../controllers/productController.js");
const { isAdmin, requireSignin } = require("../middlewares/authMiddleware.js");

// Route for creating a product
router.post("/create-product", requireSignin, isAdmin, formidable(), createProductController);

// Define other routes for various product operations

router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.put("/update-product/:pid", requireSignin, isAdmin, formidable(), updateProductController);
router.post("/product-filters", productFiltersController);
router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", realtedProductController);
router.get("/product-category/:slug", productCategoryController);

// Export the router to be used in other modules
module.exports = router;
