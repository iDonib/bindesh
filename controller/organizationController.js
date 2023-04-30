// schema
const organizationModel = require("../model/organization");
const userModel = require("../model/user");
// create organization
const createOrganization = async (req, res) => {
  const { name, admin, website, phoneNumber, address } = req.body;
  // console.log(req.user);
  try {
    const organization = new organizationModel({
      name,
      admin: req.user.id,
      website,
      phoneNumber,
      address,
    });
    await organization.save();
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
    const organization = await organizationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await organization.save();
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
const getAllOrganization = async (req, res) =>{
  try {
    const organizations = await organizationModel.find();
    if(!organizations){
      return res.status(404).json({error: "No organization found"})
    };
    res.status(200).json({message: "All organizations", organizations})
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Error while getting organizations"})
    
  }
} ;

module.exports = { createOrganization, updateOrganization, deleteOrganization, getAllOrganization };
