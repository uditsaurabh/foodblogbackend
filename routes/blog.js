const router = require("express").Router();
const { getAllBlogs } = require("../controllers/blog");
router.get("/blogs", getAllBlogs);
module.exports = router;
