const postModel = require("../model/post");
const boardModel = require("../model/board");
const userModel = require("../model/user");

// create post
const createPost = async (req, res) => {
  try {
    const { title, board, description, status, priority } = req.body;
    const post = new postModel({
      title,
      createdBy: req.user.id,
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
    console.log(post);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(201).json({
      message: "Post updated successfully",
      postData: post,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: " Error while updating post",
    });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.id);
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

const getPostByBoardId = async (req, res) => {
  try {
    const posts = await postModel.find({ board: req.params.boardId });
    console.log(posts);
    if (!posts) {
      return res.status(404).json({ error: "No board found" });
    }
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting posts" });
  }
};

const castVote = async (req, res) => {
  try {
    // const { vote } = req.body;
    const post = await postModel.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.votedBy.includes(req.user.id)) {
      return res.status(400).json({ error: "You have already voted" });
    }

    post.vote = post.vote + 1;
    post.votedBy.push(req.user.id);

    await post.save();
    res
      .status(200)
      .json({ message: "Vote added successfully", votes: post.vote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while casting vote" });
  }
};

// get specific post by id
const getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "createdBy",
        model: userModel,
        select: "username avatar",
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting post" });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPostByBoardId,
  castVote,
  getPostById,
};
