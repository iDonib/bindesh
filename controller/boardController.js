const boardModel = require("../model/board");
const organizationModel = require("../model/organization");
// create board
const createBoard = async (req, res) => {
  try {
    const { name, organization, description, boardType } = req.body;
    const org = await organizationModel.findById(organization);
    if (!org) return res.status(404).json({ error: "Organization not valid" });
    const board = new boardModel({
      name,
      organization,
      description,
      admin: req.user.id,
      boardType,
    });
    await board.save();

    res.status(201).json({
      message: "Board created successfully",
      boardData: board,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Board creation failed",
    });
  }
};

//update board
const updateBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const board = await boardModel.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res
      .status(201)
      .json({ message: "Board updated successfully", boardData: board });
  } catch (error) {
    res.status(500).json({ error: "Board not updated" });
  }
};

const getBoardByOrgId = async (req, res) => {
  try {
    const boards = await boardModel.find({ organization: req.params.orgId });
    if (!boards) {
      return res.status(404).json({ error: "No boards found" });
    }
    res.status(200).json({ boards: boards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting boards" });
  }
};

module.exports = {
  createBoard,
  updateBoard,
  getBoardByOrgId,
};
