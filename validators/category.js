const { check } = require("express-validator");

exports.createCategoryValidator = [
  check("name").notEmpty().withMessage("name is required"),
];
