const express = require("express");
const upload = require("../helper/multer");

const {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword,
  updateUserProfileById,
  deleteUser,
  getUserById,
  filterUserByDate,
  searchUser,
  searchUserByEmail,
} = require("../controller/userController");
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const {
  validateRegisterUser,
  validateLoginUser,
  validateResetPassword,
  validateUpdateUser,
} = require("../validators/userValidator");
// const limiter = require("../helper/rateLimiter");
const userRoute = express.Router();
userRoute.post(
  "/register",
  upload.single("avatar"),
  validateRegisterUser,
  registerUser
);
userRoute.post("/login", validateLoginUser, loginUser);
userRoute.get("/emailVerify", emailVerify);
userRoute.post("/forgot-password", forgotPassword);
userRoute.post("/reset-password", validateResetPassword, resetPassword);
userRoute.patch(
  "/update-user",
  isLoggedIn,
  upload.single("avatar"),
  validateUpdateUser,
  updateUserProfileById
);
userRoute.delete("/delete-user", isLoggedIn, deleteUser);
userRoute.get("/get-user-by-id", isLoggedIn, getUserById);
userRoute.get("/filter-user", filterUserByDate);
userRoute.get("/search-user", searchUser);
userRoute.get("/search-user-email", searchUserByEmail);
module.exports = userRoute;
