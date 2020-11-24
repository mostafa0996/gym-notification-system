/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
const redis = require('redis');
const { promisify } = require('util');

const config = require('../config/config');
const { sendNotificationMessage } = require('../utils/notificationQue');
const activeUser = require('../../modules/attendance/services/getActiveUsers');
const logger = require('../config/winston')(module);

const redisConfig = {};
if (process.env.NODE_ENV === 'production') {
  redisConfig.host = config.redis.host;
}
const redisClient = redis.createClient(redisConfig);
const client = redis.createClient(redisConfig);
const getAsync = promisify(client.get).bind(client);

redisClient.on('message', async (channel, data) => {
  let attendance = await getAsync(config.attendance.key);
  if (isNaN(attendance) || !attendance) {
    attendance = 0;
  }
  logger.info(`[check-in-subscriber.js] before ${attendance}`);
  attendance = parseInt(attendance, 10) + 1;
  client.set(config.attendance.key, attendance);
  logger.info(`[check-in-subscriber.js] after ${attendance}`);
  if (attendance >= parseInt(config.attendance.threshold, 10)) {
    const list = await activeUser();
    await Promise.all(
      list.map(async (doc) => {
        await sendNotificationMessage(
          JSON.stringify({
            title: 'Attendance Notifications',
            message: `Number of attendants is ${attendance}`,
            receiver: doc.userId
          })
        );
      })
    );
  }
});

/**
 * @function
 * Subscribe to notifications event
 *
 */
module.exports = () => {
  redisClient.subscribe(config.events.checkIn);
};
