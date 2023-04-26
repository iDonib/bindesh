const express = require("express");
const adminRouter = express.Router();

const { adminLogin, onlyAdmin } = require("../controller/adminController");
const { isAdmin } = require("../middleware/auth");

adminRouter.post("/login", adminLogin);

adminRouter.get("/adminOnly", isAdmin, onlyAdmin);

module.exports = adminRouter;
