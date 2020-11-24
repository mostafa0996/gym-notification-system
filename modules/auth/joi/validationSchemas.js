const Joi = require('@hapi/joi');

module.exports = {
  /**
   * User signup schema
   */
  userSignupSchema: {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        userName: Joi.string().required(),
        password: Joi.string()
          .required()
          // .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
          // .min(8)
          // .max(40)
          // .label(
          //   'Password should be alphanumeric(uppercase, lowercase and numbers) with minimum 8 characters'
          // )
      })
  },
  /**
   * Login schema
   */
  loginSchema: {
    body: Joi.object().required().keys({
      userName: Joi.string().required(),
      password: Joi.string().required()
    })
  }
};
