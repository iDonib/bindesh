const { body } = require("express-validator");
const validateReq = require("../helper/validationHelper");

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Title should not be empty")
    .isLength({ min: 2 })
    .withMessage("Title should be at least 2 characters"),

  body("description").notEmpty().withMessage("Description should not be empty"),
  body("email").isEmail().withMessage("Please enter valid email"),
  body("status").notEmpty().withMessage("Status is required").optional(),
  body("priority").notEmpty().withMessage("Priority is required").optional(),
  body("board").notEmpty().withMessage("Board is required").optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

module.exports = { validatePost };
