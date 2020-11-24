const initRoutes = require('./init-routes');
const connectDB = require('./init-db');
const checkInSubscriber = require('../pubSub/checkInSubscriber');
const checkOutSubscriber = require('../pubSub/checkOutSubscriber');
const { createQueue } = require('../utils/notificationQue');
const notificationWorker = require('../utils/notificationWorker');

/**
 * @function
 * Initializes app components
 *
 * @param {object} app - Express app.
 */
module.exports = (app) => {
  initRoutes(app);
  connectDB();
  checkInSubscriber();
  checkOutSubscriber();
  createQueue();
  notificationWorker.start();
};
