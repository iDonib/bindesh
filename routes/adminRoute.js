const express = require("express");
const adminRouter = express.Router();
const session = require("express-session");
const { adminLogin, onlyAdmin } = require("../controller/adminController");
const { isAdmin, isLoggedOut, isLoggedIn } = require("../middleware/auth");

adminRouter.post("/login", isLoggedOut, adminLogin);

adminRouter.get("/adminOnly", isLoggedIn, isAdmin, onlyAdmin);

module.exports = adminRouter;
