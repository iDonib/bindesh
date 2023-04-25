const express = require("express");
const adminRouter = express.Router();
const session = require("express-session");
const { adminLogin, onlyAdmin } = require("../controller/adminController");
const { isAdmin, isLoggedOut, isLoggedIn } = require("../middleware/auth");

adminRouter.post("/login", adminLogin);

adminRouter.get("/adminOnly", isAdmin, onlyAdmin);

module.exports = adminRouter;
