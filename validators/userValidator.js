const { body, validationResult } = require("express-validator");

const validateRegisterUser = [
  body("fullName")
    .notEmpty()
    .withMessage("Full Name is required1")
    .isLength({ min: 2 })
    .withMessage("Name should be more than 2 characters"),

  body("email").isEmail().withMessage("Please enter valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be greater than 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLoginUser = [
  body("email").isEmail().withMessage("Invalid Email"),

  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegisterUser, validateLoginUser };
