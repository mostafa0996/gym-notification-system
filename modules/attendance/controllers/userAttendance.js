/* eslint-disable no-unused-vars */
const { OK, BAD_REQUEST } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Attendance = require('../attendance.schema');

// @desc      User is checking in
// @route     GET /api/v0/attendance/user
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const page = parseInt(req.query.page || 1, 10);
  const limit = parseInt(req.query.limit || 25, 10);

  const query = {
    userId: _id
  };

console.log(query)
  const [list, count] = await Promise.all([
    Attendance.find(query)
      .select({
        _id: 1,
        checkIn: 1,
        checkOut: 1,
        createdAt: 1,
        updatedAt: 1
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1
      })
      .lean({
        autopopulate: true
      }),
    Attendance.countDocuments(query)
  ]);

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: {
      count,
      limit,
      page,
      pages: Math.ceil(count / limit || 0 / limit),
      list: list || []
    }
  });
});
