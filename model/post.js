// create schema for post

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PostStatus, PostPriority } = require("../constant");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: "open",
    },
    priority: {
      type: String,
      enum: Object.values(PostPriority),
      default: "low",
    },
    vote: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
