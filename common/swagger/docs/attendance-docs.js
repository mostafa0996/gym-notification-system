module.exports = {
  '/attendance/user': {
    get: {
      tags: ['Attendance'],
      summary: 'User list attendance',
      operationId: 'Userlistattendance',
      parameters: [
        {
          in: 'query',
          name: 'page',
          minimum: 1,
          default: 1,
          schema: {
            type: 'integer'
          },
          description: 'The page number'
        },
        {
          in: 'query',
          name: 'limit',
          minimum: 1,
          maximum: 50,
          default: 25,
          schema: {
            type: 'integer'
          },
          description: 'The numbers of items to return'
        }
      ],
      security: [
        {
          BearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'Done successfully',
                data: {
                  count: 2,
                  limit: 25,
                  page: 1,
                  pages: 1,
                  list: [
                    {
                      _id: '5d47858104rb66124b21af00',
                      checkIn: '2020-11-23 10:18:37.887Z',
                      createdAt: '2020-11-23 10:23:11.710Z',
                      updatedAt: '2020-11-23 11:41:26.154Z',
                      checkOut: '2020-11-23 11:41:26.146Z'
                    },
                    {
                      _id: '5d47858104rb66124b21af11',
                      checkIn: '2020-11-23 10:18:37.887Z',
                      createdAt: '2020-11-23 10:23:11.710Z',
                      updatedAt: '2020-11-23 11:41:26.154Z',
                      checkOut: '2020-11-23 11:41:26.146Z'
                    }
                  ]
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
  }, 
  '/attendance/user/all': {
    get: {
      tags: ['Attendance'],
      summary: 'All user list attendance',
      operationId: 'Alluserlistattendance',
      parameters: [
        {
          in: 'query',
          name: 'page',
          minimum: 1,
          default: 1,
          schema: {
            type: 'integer'
          },
          description: 'The page number'
        },
        {
          in: 'query',
          name: 'limit',
          minimum: 1,
          maximum: 50,
          default: 25,
          schema: {
            type: 'integer'
          },
          description: 'The numbers of items to return'
        }
      ],
      security: [
        {
          BearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'Done successfully',
                data: {
                  count: 2,
                  limit: 25,
                  page: 1,
                  pages: 1,
                  list: [
                    {
                      _id: '5d47858104rb66124b21af00',
                      checkIn: '2020-11-23 10:18:37.887Z',
                      createdAt: '2020-11-23 10:23:11.710Z',
                      updatedAt: '2020-11-23 11:41:26.154Z',
                      checkOut: '2020-11-23 11:41:26.146Z'
                    },
                    {
                      _id: '5d47858104rb66124b21af11',
                      checkIn: '2020-11-23 10:18:37.887Z',
                      createdAt: '2020-11-23 10:23:11.710Z',
                      updatedAt: '2020-11-23 11:41:26.154Z',
                      checkOut: '2020-11-23 11:41:26.146Z'
                    }
                  ]
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
        },
        403: {
          description: 'Access to the requested URL is Forbidden',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: false,
                message: 'Access to the requested URL is Forbidden',
                data: null
              }
            }
          }
        }
      },
      deprecated: false
    }
  },
  '/attendance/user/check-in': {
    post: {
      tags: ['Attendance'],
      summary: 'User check in',
      operationId: 'User CheckIn',
      parameters: [],
      security: [
        {
          BearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'You checked in successfully',
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
  '/attendance/user/check-out': {
    put: {
      tags: ['Attendance'],
      summary: 'User check out',
      operationId: 'Usercheckout',
      parameters: [],
      security: [
        {
          BearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                success: true,
                message: 'You checked out successfully',
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
  }
};
