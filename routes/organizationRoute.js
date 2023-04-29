const express = require("express");
const {
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controller/organizationController");

const { isLoggedIn } = require("../middleware/auth");
const organizationRoute = express.Router();
// create organization
organizationRoute.post("/create-organization", isLoggedIn, createOrganization);

// update organization
organizationRoute.patch("/update-organization/:id", updateOrganization);

// delete organization
organizationRoute.delete("/delete-organization/:id", deleteOrganization);

module.exports = organizationRoute;
