const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Model Schema
const userModel = require("../model/user");
const userVerfication = require("../model/userVerfication");

require("dotenv").config();

const SECRET_JWT = process.env.SECRET_JWT;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Register User
const registerUser = async (req, res) => {
  const { fullName, username, email, userType, password, avatar, phoneNumber } =
    req.body;
  const sendVerifyEmail = async (name, email, userId) => {
    try {
      const mailOptions = {
        from: "Bindesh",
        to: "james1415161718s@gmail.com",
        subject: "Verify your email",
        html: `<h1>Hi ${name}</h1><br><p>Click this link to verify your email <a href="localhost:5000/api/user/emailVerify?id=${userId}">Click here</a></p>`,
      };

      console.log(mailOptions.html);
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  };
  //data from req
  try {
    // Checking for existing user
    const existingUser = await userModel.findOne({
      email: email,
    });

    if (await userModel.findOne({ username: username })) {
      return res.status(500).json({ error: "Username already exists" });
    }

    if (existingUser) {
      return res
        .status(500)
        .json({ Error: "User with this email already exists!" });
    }

    // Hashing Password with salt 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName: fullName,
      email: email,
      username: username,
      password: hashedPassword,
      userType: userType,
      avatar: avatar,
      phoneNumber: phoneNumber,
    });

    const token = jwt.sign({ email: email, id: newUser._id }, SECRET_JWT);

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

    await transporter.sendMail(mailOptions, (error, info) => {
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

module.exports = {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword,
};
