require('dotenv').config(); // This loads the defined variables from .env

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const nocache = require('nocache');
const requestIp = require('request-ip');

const config = require('./common/config/config');
const passport = require('./common/config/passport');
const initApp = require('./common/init');
const logger = require('./common/config/winston')(module);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs,
  message: 'Too many requests to Gym attendance, please try again later.'
});

// Express App
const app = express();

app.use(requestIp.mw());
// Winston logger middleware
app.use(logger.getExpressWinstonMiddleware());
// Parse application/json
app.use(
  bodyParser.json({
    limit: '1mb'
  })
);
// Parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// compress all responses
app.use(compression());
// Used to enable CORS
app.use(cors());
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());
// Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
app.use(
  helmet.hsts({
    maxAge: 6 * 30 * 24 * 60 * 60,
    includeSubDomains: true,
    force: true
  })
);
// Prevents browser from caching and storing page
app.use(nocache());
// Prevent XSS attack
app.use(xss());
// Rate limiter to all requests
app.set('trust proxy', 1); // Enable if you're behind a reverse proxy  (AWS ELB, Nginx, etc)
app.use(limiter);
app.use(
  morgan((tokens, req, res) => {
    const log = [
      `<pid : ${process.pid}> <${process.env.NODE_ENV}>`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms'
    ].join(' ');
    return log;
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// images is the directory for all images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(passport.initialize());
// Initialize app
initApp(app);

app.listen(config.app.port, () => {
  logger.info(
    `[app.js] gym-notification is up & running on port ${config.app.port}`
  );
});
