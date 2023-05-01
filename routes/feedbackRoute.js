const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const {
  createFeedback,
  updateFeedback,
  getAllFeedback,
  getAllFeedbackByUser,
  deleteFeedback,
} = require("../controller/feedbackController");

const feedbackRoute = express.Router();

feedbackRoute.post("/create-feedback", isLoggedIn, createFeedback);

feedbackRoute.put("/update-feedback/:id", updateFeedback);

feedbackRoute.get("/get-all-feedback/", getAllFeedback);

feedbackRoute.get(
  "/get-all-feedback-by-user/:id",
  isLoggedIn,
  getAllFeedbackByUser
);

feedbackRoute.delete("/delete-feedback/:id", deleteFeedback);

module.exports = feedbackRoute;
