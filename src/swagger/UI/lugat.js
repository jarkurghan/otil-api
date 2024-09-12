/**
 * @swagger
 * /lugat/search:
 *   get:
 *       summary: search
 *       tags: [lugat]
 *       parameters:
 *            - in: query
 *              name: request
 *              schema:
 *                     type: string
 *                     example: "s"
 *            - name: args
 *              in: query
 *              explode: true
 *              schema:
 *                     type: string
 *                     example: word,definition,history,resource,
 *            - name: page
 *              in: query
 *              schema:
 *                     type: number
 *                     example: 1
 *            - name: count
 *              in: query
 *              schema:
 *                     type: number
 *                     example: 20
 *       responses:
 *            200:
 *                description: success
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 *            400:
 *                description: error
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: string
 */
