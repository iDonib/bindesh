const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

const userModel = require("../model/user");

const SECRET_JWT = process.env.SECRET_JWT;

const { body, validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  //Validation
  await body("fullName")
    .notEmpty()
    .withMessage("Full Name is required1")
    .isLength({ min: 2 })
    .withMessage("Name should be more than 2 characters")
    .run(req);

  await body("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .run(req);

  await body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be greater than 6 characters")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //data from req
  const { fullName, username, email, userType, password, avatar, phoneNumber } =
    req.body;

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
    });

    const token = jwt.sign(
      { email: email, id: newUser._id, userType: newUser.userType },
      SECRET_JWT,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User registered successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User registration failed!" });
  }
};
//  Login User
const loginUser = async (req, res) => {
  await body("email").isEmail().withMessage("Invalid Email").run(req);
  await body("password")
    .notEmpty()
    .withMessage("Password is required")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
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

// logoutUser
// const logoutUser = async (req, res) => {
//   try {
//     let token = req.headers.authorization;
//     if (token) {
//       token = token.split(" ")[1];
//       let user = jwt.verify(token, SECRET_JWT);

//       res.status(200).json({ message: "Logout success", newToken: newToken });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Logout failed" });
//   }
// };

module.exports = { registerUser, loginUser };
