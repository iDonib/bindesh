const commentModel = require("../model/comments");
const postModel = require("../model/post");

const createComment = async (req, res) => {
  try {
    const { comment, email, post } = req.body;

    const postData = await postModel.findById(post);
    if (!postData) {
      return res.status(400).json({ error: "Post not found" });
    }
    const comm = await commentModel.create({
      comment,
      email,
      post,
    });

    res
      .status(200)
      .json({ message: "Comment added successfully", comment: comm });

    postData.comments.push(comm._id);
    await postData.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comment creation failed" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const comm = await commentModel.findByIdAndUpdate(
      req.params.id,
      {
        comment,
      },
      { new: true }
    );

    if (!comm) {
      return res.status(404).json({ error: "Comment not found!" });
    }
    res
      .status(200)
      .json({ message: "Comment updated successfully!", newComment: comm });
  } catch (error) {
    console.log(error);
    res.status(500).json("Comment update failed");
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const postData = await postModel.findById(comment.post);
    postData.comments.pop(comment._id);
    await postData.save();

    res.status(200).json({ message: "Comment deleted successfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while deleting comment" });
  }
};

const getAllCommentsOfPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ comments: post.comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting comments" });
  }
};
module.exports = {
  createComment,
  updateComment,
  deleteCommentById,
  getAllCommentsOfPost,
};
