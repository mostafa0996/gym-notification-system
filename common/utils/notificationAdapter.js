/* eslint-disable max-classes-per-file */
const { notifications } = require('../enum');
const NewNotification = require('./newNotification');
const logger = require('../config/winston')(module);
const config = require('../config/config');

class NotificationAdapter {
  constructor() {
    const newNotification = new NewNotification();
    const { notificationType } = config;
    this.notify = function ({ title, message, receiver }) {
      logger.info(
        `[notificationAdapter.js] ${JSON.stringify({
          notificationType,
          title,
          message,
          receiver
        })}`
      );
      switch (parseInt(notificationType, 10)) {
        case notifications.SMS:
          newNotification.sendSMS(message, receiver);
          break;
        case notifications.PUSH:
          newNotification.sendPushNotification(title, message, receiver);
          break;
        default:
          newNotification.sendPushNotification(title, message, receiver);
      }
    };
  }
}

module.exports = new NotificationAdapter();
