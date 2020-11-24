/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const logger = require('../config/winston')(module);

// @desc Error handler
const errorHandler = (err, req, res, next) => {
  logger.error(
    `[errorHandler.js] Message: ${JSON.stringify(
      err.message
    )}, Stack: ${JSON.stringify(err.stack)}, Error: ${err}`
  );
  if (err instanceof SyntaxError) {
    err.message = 'Unexpected error';
  }
  return res.status(err.status || INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null
  });
};

module.exports = errorHandler;
