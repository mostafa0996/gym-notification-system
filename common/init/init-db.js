/* eslint-disable no-console */
const mongoose = require('mongoose');

const config = require('../config/config');
const logger = require('../config/winston')(module);
/**
 * @function
 * Connecting to Mongo DB.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    logger.info(`[init-db.js] MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`[init-db.js] Error: ${err}`);
  }
};

module.exports = connectDB;
