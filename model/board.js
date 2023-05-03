const mongoose = require("mongoose");
const { BoardType } = require("../constant");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    boardType: {
      type: String,
      enum: Object.values(BoardType),
      default: "bugReport",
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
