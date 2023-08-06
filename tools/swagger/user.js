/**
 * @swagger
 * /otil/v1/api/user/login:
 *   post:
 *       summary: login
 *       tags: [user]
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"user_id": "lu0000", "password": "Qwer123#"}
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

/**
 * @swagger
 * /otil/v1/api/user:
 *   post:
 *       summary: create user
 *       tags: [user]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"first_name": "ism", "last_name": "familya", "email":"test@email.uz", "phone":"+998900012498"}
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

/**
 * @swagger
 * /otil/v1/api/user/actions:
 *   get:
 *       summary: get actions of all users
 *       tags: [user]
 *       security:
 *            - token: []
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

/**
 * @swagger
 * /otil/v1/api/user/action/{id}:
 *   get:
 *       summary: get actions by user id
 *       tags: [user]
 *       security:
 *            - token: []
 *       parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              schema:
 *                     type: integer
 *                     example: 1
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

/**
 * @swagger
 * /otil/v1/api/user/action2:
 *   get:
 *       summary: get all actions
 *       tags: [user]
 *       security:
 *            - token: []
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

/**
 * @swagger
 * /otil/v1/api/user/action:
 *   post:
 *       summary: add action for user
 *       tags: [user]
 *       security:
 *            - token: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"user": 2,"actions":[1, 2, 3]}
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
