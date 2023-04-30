const express = require("express");
const {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganization,
  getAllOrgByUser,
} = require("../controller/organizationController");

const { isLoggedIn } = require("../middleware/auth");
const { validateCreateOrg } = require("../validators/organizationValidator");
const organizationRoute = express.Router();

// create organization
organizationRoute.post(
  "/create-organization",
  isLoggedIn,
  validateCreateOrg,
  createOrganization
);

// update organization
organizationRoute.patch("/update-organization/:id", updateOrganization);

// delete organization
organizationRoute.delete("/delete-organization/:id", deleteOrganization);

// get all organizations
organizationRoute.get("/get-all-organizations", getAllOrganization);

// get all organizations by user id
organizationRoute.get("/get-all-organizations-by-user/:id",isLoggedIn, getAllOrgByUser);

module.exports = organizationRoute;
