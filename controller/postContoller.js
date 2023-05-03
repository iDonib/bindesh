const postModel = require("../model/post");
const boardModel = require("../model/board");

// create post
const createPost = async (req, res) => {
  try {
    const { title, email, board, description, status, priority } = req.body;
    const post = new postModel({
      title,
      email,
      board,
      description,
      status,
      priority,
      image: req.file?.path,
    });
    await post.save();
    // push post to board
    const boardData = await boardModel.findById(board);
    if (!boardData) {
      return res.status(400).json({ error: "Board not found" });
    }
    boardData.post.push(post._id);
    await boardData.save();

    res.status(201).json({
      message: "Post created successfully",
      postData: post,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Post creation failed",
    });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const post = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        status,
        priority,
        image: req.file?.path,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(201).json({
      message: "Post updated successfully",
      postData: post,
    });
  } catch (error) {
    res.status(500).json({ error: "Post not updated" });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const boardData = await boardModel.findById(post.board);
    boardData.post.pop(post._id);
    await boardData.save();

    res.status(201).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Post not deleted" });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
