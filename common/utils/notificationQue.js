const RedisSMQ = require('rsmq');

const config = require('../config/config');
const logger = require('../config/winston')(module);

const redisConfig = {
  ns: config.redis.rqmsNamespace
};
if (process.env.NODE_ENV === 'production') {
  redisConfig.host = config.redis.host;
  redisConfig.port = config.redis.port;
}

const rsmq = new RedisSMQ(redisConfig);

let response = null;
module.exports = {
  createQueue: async () => {
    try {
      response = await rsmq.createQueueAsync({
        qname: config.redis.notificationQueue
      });
      if (response === 1) {
        logger.info(`[notificationQue.js] Queue created: ${response}`);
      }
    } catch (err) {
      if (String(err.name) === 'queueExists') {
        logger.error('[notificationQue.js] DQueue Exists');
      } else logger.error('[notificationQue.js] Redis error');
    }
  },
  sendNotificationMessage: async (data) => {
    try {
      response = await rsmq.sendMessageAsync({
        qname: config.redis.notificationQueue,
        message: data
      });
      if (response) {
        logger.info(`[notificationQue.js] Message sent. ID: ${response}`);
      }
    } catch (err) {
      logger.error(`[notificationQue.js] ${err}`);
    }
  }
};
