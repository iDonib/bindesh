const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");
const userRoute = express.Router();

userRoute.post("/register", registerUser);

userRoute.post("/login", loginUser);
// logout
userRoute.post("/logout", logoutUser);

module.exports = userRoute;
