const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const { loginController, userSignupController } = require('./controllers');
const { loginSchema, userSignupSchema } = require('./joi/validationSchemas');

const router = express.Router();

router.post(
  '/user/signup',
  requestValidator(userSignupSchema),
  userSignupController
);

router.post('/user/login', requestValidator(loginSchema), loginController);

module.exports = router;
