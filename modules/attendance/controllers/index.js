const userCheckInController = require('./userCheckIn');
const userCheckOutController = require('./userCheckOut');
const userAttendanceController = require('./userAttendance');
const allUserAttendanceController = require('./allUsersAttendance');

module.exports = {
  userCheckInController,
  userCheckOutController,
  userAttendanceController,
  allUserAttendanceController
};
