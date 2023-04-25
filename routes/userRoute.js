const express = require("express");
const {
  registerUser,
  loginUser,
  emailVerify,
} = require("../controller/userController");

const { isLoggedIn, isLoggedOut, isAdmin } = require("../middleware/auth");

const userRoute = express.Router();
// register
userRoute.post("/register", registerUser);
// login
userRoute.post("/login", loginUser);
// logout
// userRoute.post("/logout", isLoggedIn, logoutUser);
// verify email
userRoute.get("/verifyEmail/:token", emailVerify);

module.exports = userRoute;
