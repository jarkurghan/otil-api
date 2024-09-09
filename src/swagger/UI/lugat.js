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
 *              type: boolean
 *            - name: 'liabilityType[]'
 *              in: query
 *              schema:
 *                  type: array
 *                  items: 
 *                      type: string
 *                      enum: ["city", "city-region", "city-region-country"]
 *                      default: "city"
 *              collectionFormat: multi
 *              value:
 *                  - CAR
 *                  - HOUSE
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
