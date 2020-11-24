const express = require('express');

const {
  userCheckInController,
  userCheckOutController,
  userAttendanceController,
  allUserAttendanceController
} = require('./controllers');
const isAuthorized = require('../../common/middleware/isAuthorized');
const requestValidator = require('../../common/middleware/requestValidator');
const {
  ATTENDANCE_USER_CHECK_IN,
  ATTENDANCE_USER_CHECK_OUT,
  ATTENDANCE_USER_ATTENDANCE,
  ATTENDANCE_ALL_USER_ATTENDANCE
} = require('./endPoints');

const { userListAttendanceSchema } = require('./joi/validationSchemas');

const router = express.Router();

router.post(
  '/user/check-in',
  isAuthorized(ATTENDANCE_USER_CHECK_IN),
  userCheckInController
);

router.put(
  '/user/check-out',
  isAuthorized(ATTENDANCE_USER_CHECK_OUT),
  userCheckOutController
);

router.get(
  '/user',
  isAuthorized(ATTENDANCE_USER_ATTENDANCE),
  requestValidator(userListAttendanceSchema),
  userAttendanceController
);

router.get(
  '/user/all',
  isAuthorized(ATTENDANCE_ALL_USER_ATTENDANCE),
  requestValidator(userListAttendanceSchema),
  allUserAttendanceController
);

module.exports = router;
