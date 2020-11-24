const swaggerUi = require('swagger-ui-express');

const config = require('../config/config');
const healthCheck = require('../middleware/healthCheck');
const notFoundHandler = require('../middleware/notFoundHandler');
const errorHandler = require('../middleware/errorHandler');
const swaggerDocs = require('../swagger');
// Route files
const authRoutes = require('../../modules/auth/auth.routes');
const attendanceRoutes = require('../../modules/attendance/attendance.routes');
const logger = require('../config/winston')(module);

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 */
module.exports = (app) => {
  // Mount routers
  app.get(`${config.baseUrl}/health`, healthCheck);
  // Swagger URL
  app.use(
    `/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
  );

  app.use(`${config.baseUrl}/auth`, authRoutes);
  app.use(`${config.baseUrl}/attendance`, attendanceRoutes);

  // Handling Not Found
  app.use(notFoundHandler);

  // Winston error logger
  app.use(logger.getExpressWinstonErrorMiddleware());

  // Central error handler
  app.use(errorHandler);
};
