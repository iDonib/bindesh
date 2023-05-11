const express = require("express");
const {
  createComment,
  updateComment,
  deleteCommentById,
  getAllCommentsOfPost,
} = require("../controller/commentController");
const { validateComment } = require("../validators/commentValidator");
const { isLoggedIn } = require("../middleware/auth");
const { isCommentOwner } = require("../middleware/commentMiddleware");

const commentRoute = express.Router();

commentRoute.post(
  "/create-comment",
  isLoggedIn,
  validateComment,
  createComment
);

commentRoute.patch(
  "/update-comment/:id",
  isLoggedIn,
  isCommentOwner,
  validateComment,
  updateComment
);

commentRoute.delete(
  "/delete-comment/:id",
  isLoggedIn,
  isCommentOwner,
  deleteCommentById
);

commentRoute.get("/get-all-comments-of-post/:id", getAllCommentsOfPost);

module.exports = commentRoute;
