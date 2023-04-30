const express = require("express");
const {
  registerUser,
  loginUser,
  emailVerify,
  forgotPassword,
  resetPassword,
  updateUserProfileById,
  deleteUser,
  getAllUsers,
} = require("../controller/userController");

const { isLoggedIn, isAdmin } = require("../middleware/auth");

const {
  validateRegisterUser,
  validateLoginUser,
} = require("../validators/userValidator");

const userRoute = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request. Invalid request body
 *       409:
 *         description: Conflict. User already exists with the same email address
 *       500:
 *         description: Internal server error
 */
userRoute.post("/register", validateRegisterUser, registerUser);
// login

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request. Invalid request body
 *       401:
 *         description: Unauthorized. Invalid email or password
 *       500:
 *         description: Internal server error
 */
userRoute.post("/login", validateLoginUser, loginUser);

// verify email
/**
 * @swagger
 * /api/user/emailVerify:
 *   get:
 *     summary: Verify user email address
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token received in email
 *     responses:
 *       200:
 *         description: Email address verified successfully
 *       400:
 *         description: Bad request. Invalid verification token
 *       404:
 *         description: Not found. User not found for the verification token
 *       500:
 *         description: Internal server error
 */
userRoute.get("/emailVerify", emailVerify);

// forgot password
/**
 * @swagger
 * /api/user/forgot-password:
 *   post:
 *     summary: Send email with password reset link
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       400:
 *         description: Bad request. Invalid request body
 *       404:
 *         description: Not found. User not found for the given email
 *       500:
 *         description: Internal server error
 */
userRoute.post("/forgot-password", forgotPassword);

// reset password
/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset user's password
 *     description: Send a password reset email to the user's email address.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: User's email address.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       400:
 *         description: Bad request. Please provide a valid email address
 *       404:
 *         description: User with this email address not found
 *
 */
userRoute.post("/reset-password", resetPassword);

//updating user
/**
 * @swagger
 * /users/update-user/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Update the user's profile with new information
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID.
 *         required: true
 *         type: string
 *       - in: body
 *         name: user
 *         description: User object fields to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad request. Please provide valid user object fields to update
 *       404:
 *         description: User with this ID not found
 */

userRoute.put("/update-user/", isLoggedIn, updateUserProfileById);

//delete user
/**
 * @swagger
 * /users/delete-user/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user account from the system
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       404:
 *         description: User with this ID not found
 */
userRoute.delete("/delete-user/:id", deleteUser);

// get all users
userRoute.get("/get-all-users", getAllUsers);

module.exports = userRoute;
