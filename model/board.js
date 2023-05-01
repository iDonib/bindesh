const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    featureRequest: [
      {
        type: Schema.Types.ObjectId,
        ref: "FeatureRequest",
        default: null,
      },
    ],
    feedback: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
        default: null,
      },
    ],
    bugReport: [
      {
        type: Schema.Types.ObjectId,
        ref: "BigReport",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
