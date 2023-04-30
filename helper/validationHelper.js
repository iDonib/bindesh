const { validationResult } = require("express-validator");

const validateReq = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateReq;
