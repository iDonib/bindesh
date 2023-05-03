const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postContoller");

const { isLoggedIn } = require("../middleware/auth");
const upload = require("../helper/multer");
const postRoute = express.Router();

// create post
postRoute.post("/create-post", isLoggedIn, upload.array("file"), createPost);

// update post
postRoute.patch("/update-post/:id", isLoggedIn, updatePost);

// delete post
postRoute.delete("/delete-post/:id", deletePost);

module.exports = postRoute;
