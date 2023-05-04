const orgUserModel = require("../model/orgUsers");
const userModel = require("../model/user");
const addOrgUser = async (req, res) => {
  try {
    const { user, role } = req.body;

    const registeredUser = await userModel.findById(user);
    if (!registeredUser) {
      return res
        .status(400)
        .json({ error: "This user is not registered in our system" });
    }

    const existingUser = await orgUserModel.findOne({
      orgId: req.params.id,
      userId: user,
    });
    if (existingUser) {
      return res
        .status(500)
        .json({ Error: " This user  already exists in this organization !" });
    }

    const newOrgUser = new orgUserModel({
      orgId: req.params.id,
      userId: user,
      role,
    });
    await newOrgUser.save();
    res.status(201).json({
      message: "Org user added successfully",
      orgUserData: newOrgUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while adding org user" });
  }
};

const updateOrgUser = async (req, res) => {
  try {
    const { role } = req.body;
    const orgUser = await orgUserModel.findOne({
      orgId: req.params.id,
      userId: req.params.userId,
    });
    if (!orgUser) {
      return res.status(404).json({ error: "OrgUser not found" });
    }
    if (orgUser.role !== "admin") {
      return res.status(401).json({ error: "Only admin can update org user" });
    }
    await orgUserModel.findOneAndUpdate(
      { userId: req.params.userId },
      { role },
      { new: true }
    );
    res.status(201).json({ message: "Org user updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while updating org user" });
  }
};

const deleteOrgUser = async (req, res) => {
  try {
    const orgUser = await orgUserModel.findOne({
      orgId: req.params.id,
      userId: req.params.userId,
    });

    if (!orgUser) {
      return res.status(404).json({ error: "OrgUser not found" });
    }
    await orgUserModel.findOneAndDelete({ userId: req.params.userId });
    res.status(201).json({ message: "Org user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting org user" });
  }
};

module.exports = {
  addOrgUser,
  updateOrgUser,
  deleteOrgUser,
};
