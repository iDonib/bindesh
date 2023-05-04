// schema
const organizationModel = require("../model/organization");
const orgUserModel = require("../model/orgUsers");

// create organization
const createOrganization = async (req, res) => {
  const { name, website, phoneNumber, address } = req.body;
  try {
    const organization = new organizationModel({
      name,
      website,
      logo: req.files?.[0]?.path,
      photo: req.files?.[1]?.path,
      phoneNumber,
      address,
      // orgUsers: orgAdmin._id,
    });
    await organization.save();
    const orgAdmin = await orgUserModel.create({
      userId: req.user.id,
      orgId: organization.id,
      role: "admin",
    });

    res.status(201).json({
      message: "Organization created successfully",
      orgData: organization,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Organization creation failed" });
  }
};

// update organization
const updateOrganization = async (req, res) => {
  try {
    const { name, website, phoneNumber, address } = req.body;
    const organization = await organizationModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        website,
        logo: req.files?.[0]?.path,
        photo: req.files?.[1]?.path,
        phoneNumber,
        address,
      },
      { new: true }
    );
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(201).json({
      message: "Organization updated successfully",
      orgData: organization,
    });
  } catch (error) {
    res.status(500).json({ error: "Organization not updated" });
  }
};

// delete organization
const deleteOrganization = async (req, res) => {
  try {
    const organization = await organizationModel.findByIdAndDelete(
      req.params.id
    );
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting organization" });
  }
};

// get all organizations
const getAllOrganization = async (req, res) => {
  try {
    const organizations = await organizationModel.find({}, "-_id name website");
    if (!organizations) {
      return res.status(404).json({ error: "No organization found" });
    }
    res.status(200).json({ message: "All organizations", organizations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting organizations" });
  }
};

// get all organizations created by single user
const getAllOrgByUser = async (req, res) => {
  try {
    const org = await organizationModel.find({ admin: req.user.id });
    if (!org) {
      return res.status(404).json({ error: "No organization found" });
    }
    res.status(200).json({ message: "All organizations", org });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting organizations" });
  }
};

module.exports = {
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getAllOrganization,
  getAllOrgByUser,
};
