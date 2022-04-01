const { check } = require("express-validator");

exports.userSignUpValidator = [
  check("name").notEmpty().withMessage("name is required"),
  check("email").notEmpty().isEmail().withMessage("email is not valid"),
  check("password")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("password length must be 4 character long"),
];
exports.userSignInValidator = [
  check("email").notEmpty().isEmail().withMessage("email is not valid"),
  check("password")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("password length must be 4 character long"),
];
