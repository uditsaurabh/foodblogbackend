const router = require("express").Router();
const { createTagValidator } = require("../validators/tag");
const { runValidation } = require("../validators");

const {
  createTag,
  getAllTags,
  getTag,
  deleteTag,
} = require("../controllers/tag");
const { requireSignin, checkAdminRoute } = require("../middleware/auth");

router.post(
  "/createTag",
  createTagValidator,
  runValidation,
  requireSignin,
  checkAdminRoute,
  createTag
);
router.get("/getAllTags", createTagValidator, runValidation, getAllTags);
router.get("/getTag/:slug", createTagValidator, runValidation, getTag);
router.delete(
  "/deleteTag/:slug",
  createTagValidator,
  runValidation,
  requireSignin,
  checkAdminRoute,
  deleteTag
);
module.exports = router;
