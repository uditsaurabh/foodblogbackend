const router = require("express").Router();
const { createCategoryValidator } = require("../validators/category");
const { runValidation } = require("../validators");
const {
  createCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
} = require("../controllers/category");
const { requireSignin, checkAdminRoute } = require("../middleware/auth");

router.post(
  "/createCategory",
  createCategoryValidator,
  runValidation,
  requireSignin,
  checkAdminRoute,
  createCategory
);
router.get(
  "/getAllCategories",
  createCategoryValidator,
  runValidation,
  getAllCategories
);
router.get(
  "/getCategory/:slug",
  createCategoryValidator,
  runValidation,
  getCategory
);
router.delete(
  "/deleteCategory/:slug",
  createCategoryValidator,
  runValidation,
  requireSignin,
  checkAdminRoute,
  deleteCategory
);
module.exports = router;
