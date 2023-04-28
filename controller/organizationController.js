// schema
const organizationModel = require("../model/organization");

const createOrganization = async (req, res) => {
  const { name, admin, website, phoneNumber, address } = req.body;
  try {
    const organization = new organizationModel({
      name,
      admin,
      website,
      phoneNumber,
      address,
    });
    await organization.save();
    res.status(201).json({ message: "Organization created successfully", orgData:organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrganization }; 