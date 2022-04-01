const {
  userSignUpValidator,
  userSignInValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");
const router = require("express").Router();
const { signup, signin, signout } = require("../controllers/auth");

const { requireSignin, checkAdminRoute } = require("../middleware/auth");

router.post("/signup", userSignUpValidator, runValidation, signup);

router.post("/signin", userSignInValidator, runValidation, signin);

router.get("/signout", signout);



router.get("/secret", requireSignin, checkAdminRoute, (req, res, next) => {
  //  console.log(req.auth.user);
  res.send("valid");
});

module.exports = router;
