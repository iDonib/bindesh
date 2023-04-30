const { body } = require("express-validator");
const validateReq = require("../helper/validationHelper");

const validateCreateOrg = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 chars"),

  // body("admin").notEmpty().withMessage("Admin must be provided!"),

  body("website")
    .notEmpty()
    .withMessage("Website is required")
    .isURL()
    .withMessage("URL invalid"),

  body("phoneNumber")
    .isLength({ min: 8 })
    .withMessage("Phone number must be at least 8 char long")
    .optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

module.exports = { validateCreateOrg };
