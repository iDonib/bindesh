const orgUserModel = require("../model/orgUsers");

const isOrgAdmin = async (req, res, next) => {
  try {
    const orgUser = await orgUserModel.findOne({
      orgId: req.params.id,
      userId: req.user.id,
    });
    if (!orgUser) {
      return res.status(500).json({ error: "You are not even in this org" });
    }
    if (orgUser.role !== "admin") {
      return res.status(400).json({ error: "You are not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
module.exports = { isOrgAdmin };
