const express = require("express");
const {
  createFeedback,
  updateFeedback,
  getFeedbackById,
  getAllFeedbacks,
  deleteFeedback,
} = require("../controller/feedbackController");
const { isLoggedIn } = require("../middleware/auth");

const feedbackRouter = express.Router();

feedbackRouter.post("/create", isLoggedIn, createFeedback);

feedbackRouter.put("/update/:id", updateFeedback);

feedbackRouter.get("/getFeedback/:id", getFeedbackById);

feedbackRouter.get("/getAll", getAllFeedbacks);

feedbackRouter.delete("/delete/:id", deleteFeedback);

module.exports = feedbackRouter;
