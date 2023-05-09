const transporter = require("./transporterHelper");
const sendVerifyEmail = async (name, email, userId) => {
  try {
    const verificationLink = `http://localhost:8000/orgFeeder/api/user/emailVerify?id=${userId}`;
    const mailOptions = {
      from: "Bindesh",
      to: "james1415161718s@gmail.com",
      subject: "Verify your email",
      html: `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Email Verification</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			font-size: 16px;
			line-height: 1.5;
			color: #333333;
			background-color: #f2f2f2;
		}
		.container {
			max-width: 600px;
			margin: 0 auto;
			padding: 24px;
			background-color: #ffffff;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
		h1 {
			font-size: 24px;
			margin-top: 0;
			margin-bottom: 16px;
			text-align: center;
			color: #333333;
		}
		p {
			margin-top: 0;
			margin-bottom: 16px;
			line-height: 1.5;
			text-align: justify;
		}
		.button {
			display: inline-block;
			padding: 12px 24px;
			background-color: #007bff;
			color: #ffffff;
			font-size: 16px;
			font-weight: 600;
			text-decoration: none;
			border-radius: 4px;
			transition: background-color 0.2s ease;
		}
		.button:hover {
			background-color: #0069d9;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Email Verification</h1>
		<p>Dear ${name},</p>
		<p>Thank you for signing up for our service. To complete the registration process, please click on the link below to verify your email:</p>
		<p><a href="${verificationLink}" class="button" target="_blank">Verify Email</a></p>
		<p>If you did not create an account with us, please ignore this email.</p>
		<p>Best regards,</p>
		<p>The OrgFeeder Team</p>
	</div>
</body>
</html>
`,
    };

    console.log(mailOptions.html);
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendVerifyEmail;
