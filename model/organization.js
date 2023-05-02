const mongoose = require("mongoose");
const User = require("../model/user");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "apple.jpg",
    },
    photo: {
      type: String,
      default: "apple.jpg",
    },
    phoneNumber: {
      type: String,
      min: 8,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
