const isLoggedIn = async (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else {
      return res.status(401).json({ message: "Please log in first" });
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    if (req.session.user) {
      return res
        .status(401)
        .json({ message: "Already logged in. Logout first" });
    }
    next();
  } catch (error) {
    console.error("Something went wrong!");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.session.user && req.session.user.userType === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Not allowed... Must be admin" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong with middleware" });
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
