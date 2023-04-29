const express = require("express");
const {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword,
  updateUserProfileById,
  deleteUser,
  getAllUsers,
} = require("../controller/userController");

const { isLoggedIn, isAdmin } = require("../middleware/auth");

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
userRoute.post("/forgot-password", forgotPassword);

// reset password
userRoute.post("/reset-password", resetPassword);

//updating user
userRoute.put("/update-user/", isLoggedIn, updateUserProfileById);

//delete user
userRoute.delete("/delete-user/:id", deleteUser);

// get all users
userRoute.get("/get-all-users", getAllUsers);

module.exports = userRoute;
