const express = require("express");

const userRoute = express.Router();

userRoute.get("/register", registerUser);

module.exports = { registerUser };
