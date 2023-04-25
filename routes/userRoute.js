const express = require("express");
const { registerUser, loginUser, logoutUser, emailVerify} = require("../controller/userController");
const userRoute = express.Router();
// register
userRoute.post("/register", registerUser);
// login
userRoute.post("/login", loginUser);
// logout
userRoute.post("/logout", logoutUser);
// verify email
userRoute.get("/verifyEmail/:token", emailVerify);

module.exports = userRoute;
