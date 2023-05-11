const commentModel = require("../model/comments");

const isCommentOwner = async (req, res, next) => {
  try {
    const comm = await commentModel.findById(req.params.id);
    if (!comm) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comm.createdBy.toString() === req.user.id.toString()) next();
    else return res.status(400).json({ error: "You are not authorized" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { isCommentOwner };
