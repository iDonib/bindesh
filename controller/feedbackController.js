const Feedback = require("../model/feedback");

const createFeedback = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide both title and description" });
    }

    const feedback = new Feedback({
      title: title,
      description: description,
      user: req.user._id,
    });

    await feedback.save();
    res
      .status(200)
      .json({ message: "Feedback created successfully", feedback: feedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: { error: "Error creating feedback" } });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    if (!feedbacks) {
      return res.status(404).json({ message: "Feedbacks not found" });
    }
    res.status(200).json({ Feedbacks: feedbacks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Error getting feedbacks" });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById({ id: req.params.id });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ Feedback: feedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error getting feedback" });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (
      feedback.user.toString() !== req.user._id.toString() &&
      req.user.userType !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const newFeedback = {
      title: title,
      description: description,
      status: status,
    };

    await feedback.save();
    res.status(200).json({
      message: "Feedback Updated successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating feedback" });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    if (
      feedback.user.toString() !== req.user._id.toString() &&
      req.user.userType !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await feedback.remove();

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting feedback" });
  }
};
module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
