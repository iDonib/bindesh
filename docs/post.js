/**
 * @swagger
 * /post/create-post:
 *   post:
 *     description: Create a post
 *     tags:
 *       - Post
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
 *             title:
 *               example: any
 *             board:
 *               example: any
 *             description:
 *               example: any
 *             status:
 *               example: any
 *             priority:
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
 * /post/update-post/{id}:
 *   put:
 *     description: Update a post by ID
 *     tags:
 *       - Post
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
 *             title:
 *               example: any
 *             description:
 *               example: any
 *             status:
 *               example: any
 *             priority:
 *               example: any
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
 *
 * /post/delete-post/{id}:
 *   delete:
 *     description: Delete a post by ID
 *     tags:
 *       - Post
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
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /post/get-post/board/{boardId}:
 *   get:
 *     description: Get all posts for a board
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: boardId
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
 * /post/cast-vote/{postId}:
 *   post:
 *     description: Cast a vote for a post
 *     tags:
 *       - Post
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: postId
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
 * /post/get-post/{id}:
 *   get:
 *     description: Get a post by ID
 *     tags:
 *       - Post
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
