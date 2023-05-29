// swagger for documentation

// register user
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login with email and password
 *     tags:
 *       - Users
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
 *
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 */

// register user
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request. Invalid request body
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - username
 *         - fullName
 *         - email
 *         - password
 */

// verify email
/**
 * @swagger
 * /user/emailVerify:
 *   get:
 *     summary: Verify user's email address
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Email address verified successfully
 *       400:
 *         description: Bad request. User not found
 *       500:
 *         description: Internal server error
 *     requestBody:
 *       required: false
 *
 * components:
 *   schemas:
 *     EmailVerification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *       required:
 *         - id
 */

// forgot password
/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Send OTP for password reset
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request. User not found with the provided email
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *       required:
 *         - email
 */
// reset password
/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset user's password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successful
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     ResetPasswordRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         newPassword:
 *           type: string
 *           format: password
 *         otp:
 *           type: string
 *       required:
 *         - email
 *         - newPassword
 *         - otp
 */
/**
 * @swagger
 * /user/update-user:
 *   patch:
 *     description: Update user
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             fullName:
 *               example: any
 *             email:
 *               example: any
 *             password:
 *               example: any
 *             username:
 *               example: any
 *             phoneNumber:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /user/delete-user:
 *   delete:
 *     description: Delete user
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /user/get-user-by-id:
 *   get:
 *     description: Get user by ID
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *  /user/filter-user:
 *   get:
 *     description: Filter users
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /user/search-user:
 *   get:
 *     description: Search users by full name
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: fullName
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /user/search-user-email:
 *   get:
 *     description: Search users by email
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: email
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/get-user-by-id:
 *  get:
 *   description: Get user by ID
 *  tags:
 *   - Users
 * produces:
 *  - application/json
 * parameters:
 * - name: authorization
 *  in: header
 * type: string
 * responses:
 * 200:
 * description: OK
 * 400:
 * description: Bad Request
 * 500:
 * description: Internal Server Error
 *
 */
