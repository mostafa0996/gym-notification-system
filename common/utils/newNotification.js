const logger = require('../config/winston')(module);

class NewNotification {
  constructor() {
    this.sendSMS = function (message, receiver) {
      logger.info(
        `[newNotification.js] SMS notification: Message ${message}, sent to ${receiver}`
      );
    };
    this.sendPushNotification = function (title, message, receiver) {
      logger.info(
        `[newNotification.js] Push notification: Title ${title}, Message ${message}, pushed to ${receiver}`
      );
    };
  }
}

module.exports = NewNotification;
