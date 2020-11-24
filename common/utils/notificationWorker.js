/* eslint-disable no-unused-vars */
const RSMQWorker = require('rsmq-worker');

const config = require('../config/config');
const { notify } = require('../helpers');
const logger = require('../config/winston')(module);

const redisConfig = {
  ns: config.redis.rqmsNamespace
};
if (process.env.NODE_ENV === 'production') {
  redisConfig.host = config.redis.host;
  redisConfig.port = config.redis.port;
}

const worker = new RSMQWorker('NOTIFICATION_QUEUE', redisConfig);

worker.on('message', (data, next, id) => {
  const message = JSON.parse(data);
  notify(message);
  next();
});

// optional error listeners
worker.on('error', (err, message) => {
  logger.error(`[notificationWorker.js] [error] ${err} ${message.id}`);
});
worker.on('exceeded', (message) => {
  logger.error(`[notificationWorker.js] [exceeded] ${message.id}`);
});
worker.on('timeout', (message) => {
  logger.error(`[notificationWorker.js] [timeout] ${message.id} ${message.rc}`);
});

module.exports = worker;
