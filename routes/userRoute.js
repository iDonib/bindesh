const express = require("express");
const {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword
} = require("../controller/userController");

const { isLoggedIn, isAdmin } = require("../middleware/auth");

const userRoute = express.Router();

// register
userRoute.post("/register", registerUser);

// login
userRoute.post("/login", loginUser);
// logout
// userRoute.post("/logout", isLoggedIn, logoutUser);

// verify email
userRoute.get("/verifyEmail/:token", emailVerify);

// forgot password
userRoute.post("/forgotPassword", forgotPassword);

// reset password
userRoute.post("/reset-password/:token", resetPassword);

module.exports = userRoute;
