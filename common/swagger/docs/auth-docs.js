module.exports = {
  '/auth/user/signup': {
    post: {
      tags: ['Auth'],
      summary: 'Signup',
      description: 'USer signup',
      operationId: 'Signup',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignupRequest'
            },
            example: {
              name: 'Khattab',
              email: 'khattab@gym.com',
              phoneNumber: '01002192057',
              userName: 'khattab',
              password: '12345678'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'Done successfully',
                data: null
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: false,
                message: 'Unauthorized',
                data: null
              }
            }
          }
        }
      },
      deprecated: false
    }
  },
  '/auth/user/login': {
    post: {
      tags: ['Auth'],
      summary: 'User Login',
      description: 'User login with his userName & password',
      operationId: 'UserLogin',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserLoginRequest'
            },
            example: {
              userName: 'khattab',
              password: '12345678'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'User logged in successfully',
                data: {
                  _id: '5d47858104rb66124b21afgt',
                  name: 'khattab',
                  email: 'khattab@gym.com',
                  roles: ['USER'],
                  token:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJkMTI1MWVlODU0ZDI0OTk0NzYxYmEiLCJpYXQiOjE2MDYyMjY1MjEsImV4cCI6MTYwNzQzNjEyMX0.L91H58W0lB0vUvu2eRg0OJmHsum7rA4_f_JnnHbDTVk'
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Server Error'
        },
        401: {
          description: 'UnAuthorized',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: false,
                message: 'Unauthorized',
                data: null
              }
            }
          }
        }
      },
      deprecated: false
    }
  }
};
