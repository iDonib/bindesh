const { app } = require("../index");
const request = require("supertest");

describe("Tests for user: ", () => {
  it("Registering a user", async () => {
    const response = await request(app)
      .post("/orgFeeder/api/user/register")
      .send({
        fullName: "Donib Irakihda",
        username: "jest1",
        password: "hacker",
        email: "jest1@jest.com",
      });

    console.log("Response: ", response.body);
    expect(response.body.Error).toBe("User with this email already exists!");
    expect(response.statusCode).toBe(500);
  }, 600000);

  it.only("Login user:", async () => {
    const response = await request(app).post("/orgFeeder/api/user/login").send({
      email: "jest1@jest.com",
      password: "hacker",
    });

    console.log("Response: ", response.body);
    expect(response.body.message).toBe("Login Success");
    expect(response.statusCode).toBe(200);
  }, 600000);
});
