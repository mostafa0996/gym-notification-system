/* eslint-disable no-unused-vars */
const { CREATED } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const { roles } = require('../../../common/enum');

const { USER } = roles;

// @desc      User signup
// @route     POST /api/v0/auth/user/signup
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { name, email, phoneNumber, userName, password } = req.body;

  await User.create({
    name,
    email,
    phoneNumber,
    userName,
    password,
    roles: [USER],
    isActive: true
  });

  return res.status(CREATED).json({
    success: true,
    message: 'Done successfully.',
    data: null
  });
});
