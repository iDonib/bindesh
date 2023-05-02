const { body } = require("express-validator");
const validateReq = require("../helper/validationHelper");

const validateFeatues = [
  body("title")
    .notEmpty()
    .withMessage("Title should not be empty")
    .isLength({ min: 2 })
    .withMessage("Title should be at least 2 characters"),

  body("description").notEmpty().withMessage("Description should not be empty"),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

module.exports = { validateFeatues };
