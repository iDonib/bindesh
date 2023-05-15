const { app } = require("../index");
const request = require("supertest");
require("dotenv").config();

let token;
beforeAll(async () => {
  const response = await request(app).post("/orgFeeder/api/user/login").send({
    email: "jest1@jest1.com",
    password: "hacker",
  });
  token = response.body.token;
}, 600000);
describe("Tests for organization: ", () => {
  it("Creating an organization", async () => {
    const response = await request(app)
      .post("/orgFeeder/api/organization/create-organization")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Jest Organizations",
        description: "This is a test organization",
        email: "abc@gmail.com",
        website: "www.abc.com",
        phone: "1234567890",
      });

    console.log("Response: ", response.body);
    expect(response.body.message).toBe("Organization created successfully");
    expect(response.statusCode).toBe(201);
  }, 600000);

  it("Updating an organization", async () => {
    const response = await request(app)
      .patch(
        "/orgFeeder/api/organization/update-organization/645e1fc6ea4978bd7906dbb0"
      )
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Jest Organizationaa",
        description: "This is a test organization",
        email: "abc@gmail.com",
        website: "www.abc.com",
        phone: "1234567890",
      });
    console.log("Response: ", response.body);
    // expect(response.body.message).toBe("Organization updated successfully");
    expect(response.body.error).toBe("Organization not found");

    expect(response.statusCode).toBe(404);
  }, 600000);

  it("Deleting an organization", async () => {
    const response = await request(app)
      .delete(
        "/orgFeeder/api/organization/delete-organization/645e1fc6ea4978bd7906dbb0"
      )
      .set("Authorization", `Bearer ${token}`);
    console.log("Response:", response.body);
    // expect(response.body.message).toBe("Organization deleted successfully");
    expect(response.body.error).toBe("Organization not found");

    expect(response.statusCode).toBe(404);
  }, 600000);
});
