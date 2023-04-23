const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../model/user");

const SECRET_JWT = process.env.SECRET_JWT;

const registerUser = async (req, res) => {
  //data from req
  const { fullName, username, email, userType, password, avatar, phoneNumber } =
    req.body;

  try {
    // Checking for existing user
    const existingUser = await userModel.findOne({ email: email });
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

    res
      .status(200)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User registration failed!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = userModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(500).json({ error: "User not found with this email!" });
    }

    // check password

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(500).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_JWT
    );

    res
      .status(200)
      .json({ message: "Login Success", user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { registerUser, loginUser };
