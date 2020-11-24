const authDocs = require('./auth-docs');
const attendanceDocs = require('./attendance-docs');

module.exports = {
  ...authDocs,
  ...attendanceDocs
};
