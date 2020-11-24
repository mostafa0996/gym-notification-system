module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Gym Attendance',
    description: 'Gym backend APIs documentations',
    termsOfService: 'https://gym/services',
    contact: {
      name: 'Gym API Support',
      url: 'https://gym/contact-us',
      email: 'support@gym.net'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://gym/about-us'
    },
    version: '1.0'
  },
  servers: [
    {
      url: '{protocol}://localhost:3000/api/v0',
      description: 'Local Server',
      variables: {
        protocol: {
          enum: ['http'],
          default: 'http'
        }
      }
    }
  ],
  tags: [
    {
      name: 'Auth'
    },
    {
      name: 'Attendance'
    }
  ]
};
