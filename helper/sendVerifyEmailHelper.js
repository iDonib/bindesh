const transporter = require("./transporterHelper");
const sendVerifyEmail = async (name, email, userId) => {
  try {
    const mailOptions = {
      from: "Bindesh",
      to: "james1415161718s@gmail.com",
      subject: "Verify your email",
      html: `
      <h1>Hi ${name},</h1>
      <p>Thank you for registering on OrgFeeder. Please click on the link below to verify your email address:</p>
      <a href="http://localhost:8000/orgFeeder/api/user/emailVerify?id=${userId}">Verify Email</a>
      <p>If you did not register on our website, please ignore this email.</p>
      <p>Thank you,</p>
      <p>OrgFeeder Team</p>
    `,
    };

    console.log(mailOptions.html);
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendVerifyEmail;
