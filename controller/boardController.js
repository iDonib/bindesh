const boardModel = require("../model/board");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
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

module.exports = {
  updateBoard,
};
