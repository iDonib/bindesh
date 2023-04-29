const express = require("express");
const { createOrganization,updateOrganization, deleteOrganization } = require("../controller/organizationController");

const organizationRoute = express.Router();
// create organization
organizationRoute.post("/create-organization", createOrganization);

// update organization
organizationRoute.patch("/update-organization/:id", updateOrganization);

// delete organization
organizationRoute.delete("/delete-organization/:id", deleteOrganization);


module.exports = organizationRoute;