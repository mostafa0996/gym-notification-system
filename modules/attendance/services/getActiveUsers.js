const Attendance = require('../attendance.schema');

/**
 * @function
 * Returns active users in the gym
 *
 */
module.exports = async () => {
  return Attendance.find({
    checkIn: {
      $gte: new Date(new Date().setHours(0, 0, 0)),
      $lt: new Date(new Date().setHours(23, 59, 59))
    },
    checkOut: {
      $eq: null
    }
  }).select({
    userId: 1
  });
};
