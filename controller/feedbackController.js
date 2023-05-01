const feedbackModel = require("../model/feedback");
const boardModel = require("../model/board");

const createFeedback = async (req, res) => {
  const { title, description, board } = req.body;
  try {
    const feedback = new feedbackModel({
      title,
      description,
      createdBy: req.user.id,
      board,
    });

    await feedback.save();

    const boardData = await boardModel.findByIdAndUpdate(board);
    boardData.feedback.push(feedback);

    res.status(200).json({
      message: "Feedback created successfully!",
      feedback: feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating feedback" });
  }
};

const updateFeedback = async (req, res) => {
  const { title, description } = req.body;
  try {
    const feedback = await feedbackModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({
      message: "feedback updated successfully!",
      updated: feedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while updating feedback" });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await feedbackModel.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting feedback" });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await feedbackModel.find();
    if (!feedback) {
      return res.status(404).json({ error: "No feedback found" });
    }
    res.status(200).json({ Feedback: feedback });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error while getting feature requesfeedback" });
  }
};

const getAllFeedbackByUser = async (req, res) => {
  try {
    const feedback = await feedbackModel.find({ createdBy: req.params.id });
    if (!feedback) {
      return res.status(404).json({ error: "No feature request found" });
    }
    res.status(200).json({ Feedback: feedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting feedback" });
  }
};

module.exports = {
  createFeedback,
  updateFeedback,
  getAllFeedback,
  getAllFeedbackByUser,
  deleteFeedback,
};
