const bugReportModel = require("../model/bugReport");
const boardModel = require("../model/board");
const User = require("../model/user");

const createBugReport = async (req, res) => {
  const { title, description, board } = req.body;
  try {
    const bugReport = new bugReportModel({
      title,
      description,
      createdBy: req.user.id,
      board,
    });

    await bugReport.save();
    //push bug report to board
    const boardData = await boardModel.findByIdAndUpdate(board);
    boardData.bugReport.push(bugReport);
    console.log(boardData);

    res.status(200).json({
      message: "Bug Report created successfully!",
      bugReport: bugReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating Bug Report" });
  }
};

const updateBugReport = async (req, res) => {
  const { title, description } = req.body;
  try {
    const bugReport = await bugReportModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      { new: true }
    );

    // bugReport updated by only by the creator user
    if (bugReport.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!bugReport) {
      return res.status(404).json({ error: "Bug Report not found" });
    }

    res.status(200).json({
      message: "Bug Reportupdated successfully!",
      updated: bugReport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while updating bug report" });
  }
};

const deleteBugReport = async (req, res) => {
  try {
    const bugReport = await bugReportModel.findByIdAndDelete(req.params.id);
    // bugReport deleted by only by the creator user and organization admin
    if (
      bugReport.createdBy.toString() !== req.user.id ||
      req.user.userType !== "admin"
    ) {
      return res.status(401).json({ error: "Not authorized" });
    }
    if (!bugReport) {
      return res.status(404).json({ error: "Bug Report not found" });
    }
    res.status(200).json({ message: "Bug Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting Bug Report" });
  }
};

const getAllBugReport = async (req, res) => {
  try {
    const bug = await bugReportModel.find({}, "-_id title description");
    if (!bug) {
      return res.status(404).json({ error: "No bug report found" });
    }
    res.status(200).json({ bugReport: bug });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting bug report" });
  }
};

const getAllBugReportByUser = async (req, res) => {
  try {
    const bug = await bugReportModel.find({ createdBy: req.user.id }).populate({
      path: "createdBy",
      model: User,
      select: "fullName userName email avatar phoneNumber userType",
    });

    if (!bug) {
      return res.status(404).json({ error: "No bug report found" });
    }
    res.status(200).json({ FeatureRequests: feat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting bug report" });
  }
};

module.exports = {
  createBugReport,
  updateBugReport,
  deleteBugReport,
  getAllBugReport,
  getAllBugReportByUser,
};
