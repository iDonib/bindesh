const { body } = require("express-validator");
const validateReq = require("../helper/validationHelper");

const validateComment = [
  body("comment")
    .notEmpty()
    .withMessage("Please provide comment")
    .isLength({ min: 2 })
    .withMessage("Comment must be at least two characters"),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

module.exports = { validateComment };
