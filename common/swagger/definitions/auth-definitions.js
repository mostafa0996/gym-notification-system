module.exports = {
  SignupRequest: {
    title: 'SignupRequest',
    required: ['name', 'email', 'phoneNumber', 'userName', 'password'],
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      phoneNumber: {
        type: 'string'
      },
      userName: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    example: {
      name: 'Khattab',
      email: 'khattab@gym.com',
      phoneNumber: '01002192057',
      userName: 'khattab',
      password: '12345678'
    }
  },
  UserLoginRequest: {
    title: 'UserLoginRequest',
    required: ['userName', 'password'],
    type: 'object',
    properties: {
      userName: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    },
    example: {
      userName: 'khattab',
      password: '12345678'
    }
  }
};
