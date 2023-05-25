/**
 * @swagger
 * /orgUser/add/{id}:
 *   post:
 *     description: Add a user to an organization
 *     tags:
 *       - orgUser
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
 *             user:
 *               example: any
 *             role:
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
 * /orgUser/update/{id}/{userId}:
 *   patch:
 *     description: Update the role of a user in an organization
 *     tags:
 *       - orgUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: userId
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
 *             role:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /orgUser/delete/{id}/{userId}:
 *   delete:
 *     description: Remove a user from an organization
 *     tags:
 *       - orgUser
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: userId
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
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
