/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
const redis = require('redis');
const { promisify } = require('util');

const config = require('../config/config');
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
  logger.info(`[check-out-subscriber.js] before ${attendance}`);
  if (isNaN(attendance) || !attendance) {
    attendance = 0;
  } else {
    attendance = parseInt(attendance, 10) - 1;
  }
  client.set(config.attendance.key, attendance);
  logger.info(`[check-out-subscriber.js] after ${attendance}`);
});

/**
 * @function
 * Subscribe to notifications event
 *
 */
module.exports = () => {
  redisClient.subscribe(config.events.checkOut);
};
