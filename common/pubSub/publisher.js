const redis = require('redis');

const config = require('../config/config');
const logger = require('../config/winston')(module);

const redisConfig = {};
if (process.env.NODE_ENV === 'production') {
  redisConfig.host = config.redis.host;
}

const publisher = redis.createClient(redisConfig);

/**
 * @function
 * Publish an event with data
 *
 * @param {String} eventName - The event name to be emitted.
 * @param {String} data - The data to be published.
 */
module.exports = (eventName, data) => {
  logger.info(`[publisher.js] ${eventName}`);
  publisher.publish(eventName, data);
};
