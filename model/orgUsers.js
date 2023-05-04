const mongoose = require("mongoose");
const { OrgUserRole } = require("../constant");
const orgUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(OrgUserRole),
      default: "member",
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const OrgUser = mongoose.model("OrgUser", orgUserSchema);
module.exports = OrgUser;
