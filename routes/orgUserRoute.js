const express = require("express");
const upload = require("../helper/multer");

const {
  addOrgUser,
  updateOrgUser,
  deleteOrgUser,
} = require("../controller/orgUserController");

const { isLoggedIn, isAdmin } = require("../middleware/auth");

const orgUserRoute = express.Router();

orgUserRoute.post("/add/:id", isLoggedIn, addOrgUser);
orgUserRoute.put("/update/:id/:userId", isLoggedIn, isAdmin, updateOrgUser);
orgUserRoute.delete("/delete/:id/:userId", isLoggedIn, isAdmin, deleteOrgUser);

module.exports = orgUserRoute;
