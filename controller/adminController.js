const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_JWT = process.env.SECRET_JWT;

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      if (await bcrypt.compare(password, existingUser.password)) {
        if (existingUser.userType === "user") {
          return res.status(500).json({ error: "invalid credentials" });
        } else {
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
          res
            .status(200)
            .json({
              message: "Admin login success",
              admin: existingUser,
              token: token,
            });
        }
      } else {
        return res.status(500).json({ error: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong while logging in" });
  }
};

const onlyAdmin = async (req, res) => {
  console.log("I got here");
  return res.status(200).json({ message: "Wow I am admin" });
};

// get all users in admin dashboard
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({ userType: "user" });
    if (!users) {
      return res.status(404).json({ error: "No user found" });
    }
    res.status(200).json({ message: "All users", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting users" });
  }
};

// delete user in admin dashboard
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while deleting user" });
  }
};

module.exports = { adminLogin, onlyAdmin, getAllUsers, deleteUser };
