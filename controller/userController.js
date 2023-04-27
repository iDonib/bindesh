const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Model Schema
const userModel = require("../model/user");
const userVerfication = require("../model/userVerfication");

require("dotenv").config();

const SECRET_JWT = process.env.SECRET_JWT;

const nodemailer = require("nodemailer");

// Register User
const registerUser = async (req, res) => {
  const { fullName, username, email, userType, password, avatar, phoneNumber } =
    req.body;
  const sendVerifyEmail = async (name, email, userId) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
     
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
      username: username,
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
      verfied: false,
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
    const resetToken = jwt.sign({ email: user.email }, SECRET_JWT, {
      expiresIn: "15m",
    });
    const resetUrl = `http://localhost:5000/api/user/reset-password/${resetToken}`;

    const mailOptions = {
      from: "Bindesh",
      to: "james1415161718s@gmail.com",
      subject: "Reset your password",
      text: `Click this link to reset your password:${resetUrl}`,
    };
    await transporter.sendMail(mailOptions);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 900000;
    await user.save();
    return res.status(200).json({ message: "Reset password link sent to your email" });

  } catch(error) {
    console.error(error);
    return res.status(500).json({ error: "Reset password failed" });
  }
};
//reset password
const resetPassword = async (req, res) => {
  const {password,email} = req.body;
  try{
    const user = await userModel.findOne({email:email});
    if(!user){
      return res.status(500).json({error: "Invalid or expired token"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({message: "Password reset success"});
  }catch(error){
    console.error(error);
    return res.status(500).json({error: "Reset password failed"});
  }
};



module.exports = { registerUser, loginUser, emailVerify, forgotPassword, resetPassword };
