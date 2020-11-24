const { OK } = require('http-status-codes');

// @desc App health check
const healthCheck = (req, res) => {
  return res.status(OK).json({
    success: true,
    message: 'App is up & running.',
    data: null
  });
};

module.exports = healthCheck;
