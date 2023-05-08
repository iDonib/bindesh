// only admin can update and delete post of his organization and user of other organization can't update and delete post of other organization
const boardModel = require("../model/board");
const postModel = require("../model/post");
const orgUserModel = require("../model/orgUsers");
const isPostOwner = async (req, res, next) => {
  try {
    console.time("Che1");
    console.time("Che2");
    console.time("Che3");
    const post = await postModel.findById(req.params.id).populate({
      path: "board",
      model: boardModel,
      select: "_id organization",
    });
    // console.log(post);
    const orgUser = await orgUserModel.findOne({
      orgId: post.board.organization,
      userId: req.user.id,
    });

    if (orgUser && orgUser.role.toString() === "admin") {
      return next();
    }

    if (post.createdBy.toString() === req.user.id.toString()) {
      return next();
    } else return res.status(400).json({ error: "You are not authorized" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { isPostOwner };
