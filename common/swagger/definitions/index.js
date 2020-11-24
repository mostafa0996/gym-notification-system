const authDefinitions = require('./auth-definitions');
const attendanceDefinitions = require('./attendance-definitions');

module.exports = {
  ...authDefinitions,
  ...attendanceDefinitions
};
