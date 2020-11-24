const { roles } = require('../../enum');
const superAdminPolicy = require('./superAdmin');
const userPolicy = require('./user');

const { SUPER_ADMIN, USER } = roles;

const opts = {
  [SUPER_ADMIN]: {
    // list of allowed operations
    can: superAdminPolicy
  },
  [USER]: {
    can: userPolicy
  }
};

module.exports = opts;
