const userModel = require("../model/user");
const orgModel = require("../model/organization");
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
          res.status(200).json({
            message: "Admin login success",
            admin: existingUser,
            token: token,
          });
        }
      } else {
        return res.status(500).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(404).json({ error: "User not found with this email" });
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

const getAllOrg = async (req, res) => {
  try {
    const org = await orgModel.find();
    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(200).json({ message: "Getting org success", orgs: org });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting orgs" });
  }
};

module.exports = { adminLogin, onlyAdmin, getAllOrg };
