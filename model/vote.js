const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback",
    required: true,
  },
  vote: {
    type: Number,
    enum: [1, -1],
    required: true,
  },
});

VoteSchema.index({ user: 1, feedback: 1 }, { unique: true });

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
