const Joi = require('@hapi/joi');

module.exports = {
  /**
   * User list attendance schema
   */
  userListAttendanceSchema: {
    query: Joi.object().keys({
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1).max(50),
    })
  }
};
