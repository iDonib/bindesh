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
      default:
        "https://www.freepik.com/premium-photo/photo-icon-with-woman-blue-background-3d-rendering_23319383.htm#query=profile%20avatar%20pic&position=22&from_view=search&track=ais",
    },
    photo: {
      type: String,
      default:
        "https://www.freepik.com/premium-photo/photo-icon-with-woman-blue-background-3d-rendering_23319383.htm#query=profile%20avatar%20pic&position=22&from_view=search&track=ais",
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
