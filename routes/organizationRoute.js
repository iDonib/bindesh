const express = require("express");
const { createOrganization } = require("../controller/organizationController");

const organizationRoute = express.Router();
// create organization
organizationRoute.post("/create-organization", createOrganization);


module.exports = organizationRoute;