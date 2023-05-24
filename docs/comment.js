/**
 * @swagger
 * /comment/create-comment:
 *   post:
 *     description: Create a comment
 *     tags:
 *       - Comment
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
 *             comment:
 *               example: any
 *             post:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /comment/update-comment/{id}:
 *   patch:
 *     description: Update a comment by ID
 *     tags:
 *       - Comment
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
 *             comment:
 *               example: any
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /comment/delete-comment/{id}:
 *   delete:
 *     description: Delete a comment by ID
 *     tags:
 *       - Comment
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
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /comment/get-all-comments-of-post/{id}:
 *   get:
 *     description: Get all comments of a post
 *     tags:
 *       - Comment
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
 */
