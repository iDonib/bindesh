const express = require("express");
const adminRouter = express.Router();

const {
  adminLogin,
  onlyAdmin,
  getAllUsers,
  deleteUser,
} = require("../controller/adminController");
const { isAdmin } = require("../middleware/auth");
const { isLoggedIn } = require("../middleware/auth");
const { validateLoginUser } = require("../validators/userValidator");

adminRouter.post("/login", validateLoginUser, adminLogin);

adminRouter.get("/adminOnly", isAdmin, onlyAdmin);

adminRouter.get("/allUsers", isLoggedIn, isAdmin, getAllUsers);

adminRouter.delete("/deleteUser/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = adminRouter;
