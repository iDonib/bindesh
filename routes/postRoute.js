const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postContoller");
const { validatePost } = require("../validators/postValidator");
const upload = require("../helper/multer");
const postRoute = express.Router();

// create post
postRoute.post("/create-post", upload.single("file"), validatePost, createPost);

// update post
postRoute.patch(
  "/update-post/:id",
  upload.single("file"),
  validatePost,
  updatePost
);

// delete post
postRoute.delete("/delete-post/:id", deletePost);

module.exports = postRoute;
