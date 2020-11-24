/* eslint-disable no-unused-vars */
const { OK, BAD_REQUEST } = require('http-status-codes');

const config = require('../../../common/config/config');
const asyncHandler = require('../../../common/middleware/async');
const Attendance = require('../attendance.schema');
const publish = require('../../../common/pubSub/publisher');

// @desc      User is checking in
// @route     POST /api/v0/attendance/user/check-in
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const attendant = await Attendance.findOne({
    userId: _id,
    checkIn: {
      $gte: new Date(new Date().setHours(0, 0, 0)),
      $lt: new Date(new Date().setHours(23, 59, 59))
    },
    checkOut: {
      $eq: null
    }
  })
    .select({
      _id: 1
    })
    .lean();

  if (attendant) {
    return res.status(BAD_REQUEST).json({
      status: false,
      message: 'You are already checked in',
      data: null
    });
  }

  await Attendance.create({
    userId: _id
  });

  publish(config.events.checkIn, `${_id}`);

  return res.status(OK).json({
    status: true,
    message: 'You checked in successfully',
    data: null
  });
});
