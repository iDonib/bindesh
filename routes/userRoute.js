const express = require("express");
const {
  registerUser,
  loginUser,
  emailVerify,
} = require("../controller/userController");

// const { isLoggedIn, isAdmin } = require("../middleware/auth");

const {
  validateRegisterUser,
  validateLoginUser,
} = require("../validators/userValidator");

const userRoute = express.Router();
// register
userRoute.post("/register", validateRegisterUser, registerUser);
// login
userRoute.post("/login", validateLoginUser, loginUser);

// verify email
userRoute.get("/verifyEmail/:token", emailVerify);

module.exports = userRoute;
