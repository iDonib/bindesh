/**
 * @swagger
 * /organization/create-organization:
 *   post:
 *     description: Create an organization
 *     tags:
 *       - organization
 *     produces:
 *       - application/json
 *     parameters:
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
 *             name:
 *               example: any
 *             website:
 *               example: any
 *             phoneNumber:
 *               example: any
 *             address:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /organization/update-organization/{id}:
 *   patch:
 *     description: Update an organization by ID
 *     tags:
 *       - organization
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
 *             name:
 *               example: any
 *             website:
 *               example: any
 *             phoneNumber:
 *               example: any
 *             address:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /organization/delete-organization/{id}:
 *   delete:
 *     description: Delete an organization by ID
 *     tags:
 *       - organization
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
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /organization/get-all-organizations:
 *   get:
 *     description: Get all organizations
 *     tags:
 *       - organization
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: origin
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
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /organization/get-all-organizations-by-user:
 *   get:
 *     description: Get all organizations associated with a user
 *     tags:
 *       - organization
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
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
