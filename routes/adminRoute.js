const express = require("express");
const adminRouter = express.Router();

const { adminLogin, onlyAdmin } = require("../controller/adminController");
const { isAdmin } = require("../middleware/auth");
const { validateLoginUser } = require("../validators/userValidator");

adminRouter.post("/login", validateLoginUser, adminLogin);

adminRouter.get("/adminOnly", isAdmin, onlyAdmin);

module.exports = adminRouter;
