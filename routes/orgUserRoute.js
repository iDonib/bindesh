const express = require("express");
const upload = require("../helper/multer");

const {
  addOrgUser,
  updateOrgUser,
  deleteOrgUser,
} = require("../controller/orgUserController");

const { isLoggedIn } = require("../middleware/auth");
const { isOrgAdmin } = require("../middleware/orgUserMiddleware");

const orgUserRoute = express.Router();

orgUserRoute.post("/add/:id", isLoggedIn, isOrgAdmin, addOrgUser);
orgUserRoute.put("/update/:id/:userId", isLoggedIn, isOrgAdmin, updateOrgUser);
orgUserRoute.delete(
  "/delete/:id/:userId",
  isLoggedIn,
  isOrgAdmin,
  deleteOrgUser
);

module.exports = orgUserRoute;
