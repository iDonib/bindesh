const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/userController");

const { isLoggedIn, isLoggedOut, isAdmin } = require("../middleware/auth");

const userRoute = express.Router();

userRoute.post("/register", isLoggedOut, registerUser);

userRoute.post("/login", isLoggedOut, loginUser);
// logout
userRoute.post("/logout", isLoggedIn, logoutUser);

module.exports = userRoute;
