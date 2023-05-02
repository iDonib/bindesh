const featureRequestModel = require("../model/featureRequest");
const boardModel = require("../model/board");
const User = require("../model/user");

const createFeatureRequest = async (req, res) => {
  const { title, description, board } = req.body;
  try {
    const featureRequest = new featureRequestModel({
      title,
      description,
      createdBy: req.user.id,
      board,
    });

    await featureRequest.save();
    //push feature request to board
    const boardData = await boardModel.findByIdAndUpdate(board);
    boardData.featureRequest.push(featureRequest);
    res.status(200).json({
      message: "Feature Request created successfully!",
      featureRequest: featureRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while creating feature request" });
  }
};

const updateFeatureRequest = async (req, res) => {
  const { title, description } = req.body;
  try {
    const featureRequest = await featureRequestModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
      },
      { new: true }
    );

    // feature updated by only by the creator user
    if (featureRequest.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!featureRequest) {
      return res.status(404).json({ error: "Feature request not found" });
    }

    res.status(200).json({
      message: "Feature Request updated successfully!",
      updated: featureRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while updating feature request" });
  }
};

const deleteFeatureRequest = async (req, res) => {
  try {
    const featureRequest = await featureRequestModel.findByIdAndDelete(
      req.params.id
    );
    // feature deleted by only by the creator user and organization admin
    if (
      featureRequest.createdBy.toString() !== req.user.id ||
      req.user.userType !== "admin"
    ) {
      return res.status(401).json({ error: "Not authorized" });
    }
    if (!featureRequest) {
      return res.status(404).json({ error: "Feature Request not found" });
    }
    res.status(200).json({ message: "Feature Request deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting feature request" });
  }
};

const getAllFeatReq = async (req, res) => {
  try {
    const feat = await featureRequestModel.find({}, "-_id title description");
    if (!feat) {
      return res.status(404).json({ error: "No feature request found" });
    }
    res.status(200).json({ FeatureRequests: feat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting feature request" });
  }
};

const getAllFeatReqByUser = async (req, res) => {
  try {
    const feat = await featureRequestModel
      .find({ createdBy: req.user.id })
      .populate({
        path: "createdBy",
        model: User,
        select: "fullName userName email avatar phoneNumber userType",
      });

    if (!feat) {
      return res.status(404).json({ error: "No feature request found" });
    }
    res.status(200).json({ FeatureRequests: feat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting feature requests" });
  }
};

module.exports = {
  createFeatureRequest,
  updateFeatureRequest,
  deleteFeatureRequest,
  getAllFeatReq,
  getAllFeatReqByUser,
};
