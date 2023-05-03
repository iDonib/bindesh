const mongoose = require("mongoose");
const { UserRole } = require("../constant");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      min: 2,
    },
    username: {
      type: String,
      unique: true,
      min: 4,
    },
    email: {
      type: String,
      unique: true,
      requied: true,
      lowecase: true,
    },
    avatar: {
      type: String,
    },
    userType: {
      type: String,
      enum: Object.values(UserRole),
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiration: {
      type: Date,
      default: null,
    },

    phoneNumber: {
      type: String,
      min: 8,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
