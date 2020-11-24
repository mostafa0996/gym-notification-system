const notificationAdapter = require('../utils/notificationAdapter');
const logger = require('../config/winston')(module);

/**
 * @function
 * Send notification to customer according to its type
 *
 * @param {object} data
 * @param {string} data.title - The notification title.
 * @param {string} data.message - The notification message.
 * @param {string} data.receiver - The notification receiver.
 */
module.exports = ({ title, message, receiver }) => {
  logger.info(
    `[notify.js] ${JSON.stringify({
      title,
      message,
      receiver
    })}`
  );
  notificationAdapter.notify({
    title,
    message,
    receiver
  });
};
