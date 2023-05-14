const { app } = require("../index");
const request = require("supertest");

describe("Tests for user: ", () => {
  it("Registering a user", async () => {
    const response = await request(app)
      .post("/orgFeeder/api/user/register")
      .send({
        fullName: "Donib Irakihda",
        username: "apple",
        password: "hacker",
        email: "jest1@jest",
      });

    console.log("Response: ", response.body);
    expect(response.body.errors[0].msg).toBe("Please enter valid email");
    expect(response.statusCode).toBe(500);
  }, 600000);

  it.only("Login user:", async () => {
    const response = await request(app).post("/orgFeeder/api/user/login").send({
      email: "jest1@jest1.com",
      password: "hacker",
    });

    console.log("Response: ", response.body);
    expect(response.body.message).toBe("Login Success");
    expect(response.statusCode).toBe(200);
  }, 600000);

  it("Forgot password: ", async () => {
    const response = await request(app)
      .post("/orgFeeder/api/user/forgot-password")
      .send({
        email: "jest@jest.com",
      });
    console.log("Response:", response.body);
    expect(response.body.message).toBe("OTP sent to your email");
    expect(response.statusCode).toBe(200);
  }, 600000);

  it("Reset Password: ", async () => {
    const response = await request(app)
      .post("/orgFeeder/api/user/reset-password")
      .send({
        email: "jest@jest.com",
        newPassword: "hacker",
        otp: "328048",
      });

    console.log("Response: response.body");
    // expect(response.body.message).toBe(
    //   "Password reset success! Please login with new password"
    // );
    expect(response.body.error).toBe("Invalid OTP");

    expect(response.statusCode).toBe(500);
  }, 600000);

  let token;
  beforeAll(async () => {
    //perform login
    const response = await request(app).post("/orgFeeder/api/user/login").send({
      email: "jest@jest.com",
      password: "hacker",
    });
    token = response.body.token;
  }, 600000);

  it("Test for update profile", async () => {
    console.log(token);
    const res = await request(app)
      .patch("/orgFeeder/api/user/update-user")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "jest@jest.com",
        username: "jestuname1",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User updated successfully!");
  }, 600000);

  it("Test for delete user", async () => {
    const res = await request(app)
      .delete("/orgFeeder/api/user/delete-user")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully!");
  });
}, 600000);
