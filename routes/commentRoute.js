const express = require("express");
const {
  createComment,
  updateComment,
  deleteCommentById,
  getAllCommentsOfPost,
} = require("../controller/commentController");
const { validateComment } = require("../validators/commentValidator");
const { isLoggedIn } = require("../middleware/auth");

const commentRoute = express.Router();

commentRoute.post(
  "/create-comment",
  isLoggedIn,
  validateComment,
  createComment
);

commentRoute.patch("/update-comment/:id", validateComment, updateComment);

commentRoute.delete("/delete-comment/:id", deleteCommentById);

commentRoute.get("/get-all-comments-of-post/:id", getAllCommentsOfPost);

module.exports = commentRoute;
