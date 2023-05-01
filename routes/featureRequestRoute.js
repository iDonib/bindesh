const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const {
  createFeatureRequest,
  updateFeatureRequest,
  deleteFeatureRequest,
  getAllFeatReq,
  getAllFeatReqByUser,
} = require("../controller/featureRequestController");

const featureRequestRoute = express.Router();

featureRequestRoute.post(
  "/create-feature-request",
  isLoggedIn,
  createFeatureRequest
);

featureRequestRoute.patch("/update-feature-request/:id", updateFeatureRequest);

featureRequestRoute.delete("delete-feature-request/:id", deleteFeatureRequest);

featureRequestRoute.get("/get-all-feature-request", getAllFeatReq);

featureRequestRoute.get(
  "/get-all-feature-request-by-user",
  isLoggedIn,
  getAllFeatReqByUser
);

module.exports = featureRequestRoute;
