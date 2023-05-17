const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 min
  max: 10,
  message: "Too many requests from this IP.... Please try again later",
});

module.exports = limiter;
