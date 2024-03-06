const express = require('express');
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');
const {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
}=require("./../controllers/categoryController");
const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryCOntroller
);


module.exports = router;
