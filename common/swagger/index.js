const conf = require('./swagger-conf');
const definitions = require('./definitions');
const security = require('./security-schemes');
const docs = require('./docs');

const swaggerDocs = {
  ...conf,
  paths: {
    ...docs
  },
  components: {
    schemas: {
      ...definitions
    },
    securitySchemes: {
      ...security
    }
  }
};
module.exports = swaggerDocs;
