const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const {
  createFeedback,
  updateFeedback,
  getAllFeedback,
  getAllFeedbackByUser,
  deleteFeedback,
} = require("../controller/feedbackController");
const { validateFeatues } = require("../validators/featureValidator");

const feedbackRoute = express.Router();

feedbackRoute.post(
  "/create-feedback",
  isLoggedIn,
  validateFeatues,
  createFeedback
);

feedbackRoute.put(
  "/update-feedback/:id",
  isLoggedIn,
  validateFeatues,
  updateFeedback
);

feedbackRoute.get("/get-all-feedback/", getAllFeedback);

feedbackRoute.get(
  "/get-all-feedback-by-user/:id",
  isLoggedIn,
  getAllFeedbackByUser
);

feedbackRoute.delete("/delete-feedback/:id", deleteFeedback);

module.exports = feedbackRoute;
