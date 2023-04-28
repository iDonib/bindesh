const express = require("express");
const {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

// const { isLoggedIn, isAdmin } = require("../middleware/auth");

const {
  validateRegisterUser,
  validateLoginUser,
} = require("../validators/userValidator");

const userRoute = express.Router();
userRoute.post("/register", validateRegisterUser, registerUser);
// login
userRoute.post("/login", validateLoginUser, loginUser);

// verify email
userRoute.get("/emailVerify", emailVerify);

// forgot password
userRoute.post("/forgotPassword", forgotPassword);

// reset password
userRoute.post("/resetPassword", resetPassword);

module.exports = userRoute;
