const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const transporter = require("../helper/transporterHelper");
const sendVerifyEmail = require("../helper/sendVerifyEmailHelper");

// Model Schema
const userModel = require("../model/user");
const orgModel = require("../model/organization");

require("dotenv").config();

const SECRET_JWT = process.env.SECRET_JWT;

// Register User
const registerUser = async (req, res) => {
  //data from req
  const { fullName, username, email, userType, password, phoneNumber } =
    req.body;

  try {
    // Checking for existing user
    const existingUser = await userModel.findOne({
      email: email,
    });

    if (existingUser) {
      return res
        .status(500)
        .json({ Error: "User with this email already exists!" });
    }
    const existingUsername = await userModel.findOne({ username: username });
    if (existingUsername) {
      return res.status(500).json({ error: "Username already exists" });
    }

    // Hashing Password with salt 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName: fullName,
      email: email,
      username: username,
      password: hashedPassword,
      userType: userType,
      avatar: req.file?.path,
      phoneNumber: phoneNumber,
    });

    //generating token for registered user
    const token = jwt.sign({ email: email, id: newUser._id }, SECRET_JWT);

    //sending email for verification with helper function
    sendVerifyEmail(fullName, email, newUser._id);

    return res.status(200).json({
      message: "User registered successfully, please verify your email",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "User registration failed!" });
  }
};

// verify email
const emailVerify = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.query.id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user && user.emailVerified === true) {
      return res.status(500).json({ message: "User already verified." });
    }
    const updatedInfo = await userModel.updateOne(
      {
        _id: req.query.id,
      },
      { $set: { emailVerified: true } }
    );
    res.status(200).json({ message: "User verified." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User verification failed!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(500).json({ error: "User not found with this email!" });
    }

    // check password
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(500).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        userType: existingUser.userType,
        isLoggedIn: true,
      },
      SECRET_JWT,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Success",
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).json({ error: "User not found with this email" });
    }

    //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //hashing otp
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    //setting expiration time for otp at 10 min
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);

    //updating model with otp
    user.otp = hashedOTP;
    user.otpExpiration = otpExpiration;
    await user.save();

    const mailOptions = {
      from: "Bindesh",
      to: "on.screen.keyboards@gmail.com",
      subject: "OTP for Resetting your password",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Email sent with otp: " + info.response);
        return res.status(200).json({ message: "OTP sent to your email" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Reset password failed" });
  }
};
//reset password
const resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //verify otp
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== hashedOTP) {
      return res.status(500).json({ error: "Invalid OTP" });
    }

    //updating password and clearing otp
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = "";
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      message: "Password reset success! Please login with new password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Reset password failed" });
  }
};

const updateUserProfileById = async (req, res) => {
  try {
    const { fullName, email, password, username, phoneNumber } = req.body;

    const update = {
      fullName: fullName,
      email: email,
      avatar: req.file?.path,
      username: username,
      phoneNumber: phoneNumber,
    };

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      update.password = hashedPassword;
    }

    const user = await userModel.findByIdAndUpdate(
      { _id: req.user.id },
      update,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully!", updatedInfo: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating user profile" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user.id);

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    //  delete all organizations created by user
    await orgModel.deleteMany({ admin: req.user.id });

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while deleting user" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      res.status(400).json({ message: "No user found!" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting user" });
  }
};

const filterUserByDate = async (req, res) => {
  try {
    const startDate = new Date(`${req.query.startDate}T00:00:00.000Z`);
    const endDate = new Date(`${req.query.endDate}T23:59:59.999Z`);

    const query = { createdAt: { $gte: startDate, $lte: endDate } };

    const filteredUser = await userModel
      .find(query)
      .select("fullName username email createdAt ");

    if (filteredUser.length < 1) {
      return res.status(404).json({ error: "Users not found" });
    }
    res.status(200).json({
      message: `All users registered from ${startDate} to ${endDate} are `,
      filteredUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve filtered users" });
  }
};

const searchUser = async (req, res) => {
  try {
    const searchQuery = req.query.fullName;
    const regexPattern = new RegExp(searchQuery, "i");
    const query = { fullName: { $regex: regexPattern } };

    const users = await userModel.find(query).select("fullName email username");
    if (users.length > 0) {
      return res
        .status(200)
        .json({ message: `Search result for ${searchQuery} is `, users });
    } else {
      return res.status(404).json({ error: "Users not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to search user" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword,
  updateUserProfileById,
  deleteUser,
  getUserById,
  filterUserByDate,
  searchUser,
};
