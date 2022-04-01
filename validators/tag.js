const { check } = require("express-validator");

exports.createTagValidator = [
  check("name").notEmpty().withMessage("name is required"),
];
