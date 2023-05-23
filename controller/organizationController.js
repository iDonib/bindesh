// schema
const organizationModel = require("../model/organization");
const orgUserModel = require("../model/orgUsers");
const userModel = require("../model/user");

// create organization
const createOrganization = async (req, res) => {
  const { name, website, phoneNumber, address } = req.body;
  try {
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `http://${req.headers.host}/${req.file.path}`;
    }
    const url = avatarUrl?.split("/public").join("");
    const organization = new organizationModel({
      name,
      website,
      photo: url,
      phoneNumber,
      address,
      createdBy: req.user.id,
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
  const { name, website, phoneNumber, address } = req.body;
  try {
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `http://${req.headers.host}/${req.file.path}`;
    }
    const url = avatarUrl?.split("/public").join("");
    console.log(url);
    const organization = await organizationModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        website,
        photo: url,
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
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const options = {
      page: page,
      limit: limit,
      select: "-_id name website createdBy",
      populate: {
        path: "createdBy",
        model: userModel,
        select: "-_id fullName",
      },
    };
    const totalCounts = await organizationModel.countDocuments();
    const totalPages = Math.ceil(totalCounts / options.limit);

    // const organizations = await organizationModel
    //   .find({}, "-_id name website createdBy")
    //   .populate({
    //     path: "createdBy",
    //     model: userModel,
    //     select: "-_id fullName",
    //   })
    //   .lean();

    const organizations = await organizationModel.paginate({}, options);

    if (!organizations.docs.length) {
      return res.status(404).json({ error: "No organization found" });
    }

    res.status(200).json({
      message: "All organizations",
      organization: organizations.docs,
      pagination: {
        totalDocs: organizations.totalDocs,
        totalPages: totalPages,
        page: organizations.page,
        limit: organizations.limit,
      },
    });

    // if (!organizations) {
    //   return res.status(404).json({ error: "No organization found" });
    // }

    // res.status(200).json({ message: "All organizations", organizations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting organizations" });
  }
};

// get all organizations created by single user
const getAllOrgByUser = async (req, res) => {
  try {
    const org = await organizationModel
      .find({ createdBy: req.user.id })
      .populate({
        path: "createdBy",
        model: userModel,
        select: "-_id fullName",
      });
    if (!org) {
      return res.status(404).json({ error: "No organization found" });
    }
    res.status(200).json({ message: "All organizations", org: org });
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
