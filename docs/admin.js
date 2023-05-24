/**
 * @swagger
 * /admin/login:
 *   post:
 *     description: Admin login
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               example: any
 *             password:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /admin/adminOnly:
 *   get:
 *     description: Admin-only endpoint
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: authorization
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 * /admin/get-all-orgs:
 *   get:
 *     description: Get all organizations
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: authorization
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 * /admin/get-all-users:
 *   get:
 *     description: Get all users
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: authorization
 *         in: header
 *         type: string
 *       - name: page
 *         in: query
 *         type: string
 *       - name: limit
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /admin/delete-user/{id}:
 *   delete:
 *     description: Delete a user
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: authorization
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /admin/update-user-type/{id}:
 *   patch:
 *     description: Update the user type of a user
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: origin
 *         in: header
 *         type: string
 *       - name: authorization
 *         in: header
 *         type: string
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             userType:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
