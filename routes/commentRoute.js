const express = require("express");
const {
  createComment,
  updateComment,
  deleteCommentById,
  getAllCommentsOfPost,
} = require("../controller/commentController");

const commentRoute = express.Router();

commentRoute.post("/create-comment", createComment);

commentRoute.patch("/update-comment/:id", updateComment);

commentRoute.delete("/delete-comment/:id", deleteCommentById);

commentRoute.get("/get-all-comments-of-post/:id", getAllCommentsOfPost);

module.exports = commentRoute;
