/**
 * @swagger
 * /board/create-board:
 *   post:
 *     description: Create a board
 *     tags:
 *       - Board
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
 *             organization:
 *               example: any
 *             description:
 *               example: any
 *             boardType:
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
 * /board/update-board/{id}:
 *   patch:
 *     description: Update a board by ID
 *     tags:
 *       - Board
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
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
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
 * /board/get-board/org/{orgId}:
 *   get:
 *     description: Get all boards for an organization
 *     tags:
 *       - Board
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: orgId
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
