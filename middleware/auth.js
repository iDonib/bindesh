const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_JWT;

const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = await jwt.verify(token, SECRET_KEY);
      if (user.isLoggedIn === true) {
        // console.log(user);
        req.user = user;
        next();
      } else {
        return res.status(500).json({ message: "Please login first " });
      }
    } else {
      return res.status(500).json({ error: "Login error .. no token" });
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      if (user.userType === "admin") {
        next();
      } else {
        return res.status(401).json({ message: "Not Admin" });
      }
    } else {
      return res.status(401).json({ message: "No token found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong with middleware" });
  }
};

module.exports = { isLoggedIn, isAdmin };
