/* eslint-disable no-param-reassign */
const winston = require('winston');
const expressWinston = require('express-winston');

let level;
let silent;
switch (process.env.NODE_ENV) {
  case 'production':
  case 'staging':
    level = 'info';
    silent = false;
    break;
  case 'development':
  default:
    level = 'debug';
    silent = false;
    break;
}

const JSONFormatter = (log) => {
  const message = Symbol.for('message');
  const base = {
    timestamp: new Date(),
    severity: log.level.toUpperCase()
  };
  const json = Object.assign(base, log);
  log[message] = JSON.stringify(json);
  return log;
};

const transports = [
  new winston.transports.Console({
    handleExceptions: true,
    json: true,
    colorize: false,
    format: winston.format(JSONFormatter)()
  })
];

const logger = winston.createLogger({
  level,
  silent,
  defaultMeta: {
    service: 'gym-notification',
    version: '1.0.0'
  },
  transports,
  exitOnError: false
});

const expressWinstonMiddleware = expressWinston.logger({
  winstonInstance: logger,
  metaField: null,
  bodyBlacklist: ['password'],
  requestWhitelist: ['headers', 'query', 'body'],
  responseWhitelist: ['body'],
  expressFormat: false,
  colorize: false,
  statusLevels: false,
  // eslint-disable-next-line no-unused-vars
  ignoreRoute: (req, res) => {
    if (req.path.startsWith('/docs')) return true;
    if (req.path.startsWith('/stylesheets')) return true;
    if (req.path.startsWith('/images')) return true;
    if (req.path.startsWith('/javascript')) return true;
    if (req.path === '/') return true;
    if (req.method === 'OPTIONS') return true;
    return false;
  },
  level: (req, res) => {
    level = '';
    if (res.statusCode >= 100) {
      level = 'info';
    }
    if (res.statusCode >= 400) {
      level = 'warn';
    }
    if (res.statusCode >= 500) {
      level = 'error';
    }
    if (res.statusCode === 401 || res.statusCode === 403) {
      level = 'critical';
    }
    return level;
  },
  dynamicMeta: (req, res) => {
    const httpRequest = {};
    const meta = {};
    if (req) {
      meta.httpRequest = httpRequest;
      httpRequest.requestMethod = req.method;
      httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${
        req.originalUrl
      }`;
      httpRequest.protocol = `HTTP/${req.httpVersion}`;
      httpRequest.remoteIp = req.clientIp; // this includes both ipv6 and ipv4 addresses separated by ':'
      httpRequest.remoteIp =
        req.clientIp.indexOf(':') >= 0
          ? req.clientIp.substring(req.clientIp.lastIndexOf(':') + 1)
          : req.clientIp; // just ipv4
      httpRequest.requestSize = req.socket.bytesRead;
      httpRequest.userAgent = req.get('User-Agent');
      httpRequest.referrer = req.get('Referrer');
      meta.user = req.user;
    }

    if (res) {
      meta.httpRequest = httpRequest;
      httpRequest.status = res.statusCode;
      httpRequest.latency = {
        seconds: Math.floor(res.responseTime / 1000),
        nanos: (res.responseTime % 1000) * 1000000
      };
      if (res.body) {
        if (typeof res.body === 'object') {
          httpRequest.responseSize = JSON.stringify(res.body).length;
        } else if (typeof res.body === 'string') {
          httpRequest.responseSize = res.body.length;
        }
      }
    }
    return meta;
  }
});

const expressWinstonErrorMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
  metaField: null,
  colorize: false,
  requestWhitelist: ['headers', 'query', 'body'],
  msg: '{{req.method}} {{req.path}} {{err.message}}',
  responseWhitelist: ['body'],
  dynamicMeta: (req, res) => {
    const httpRequest = {};
    const meta = {};
    if (req) {
      meta.httpRequest = httpRequest;
      httpRequest.requestMethod = req.method;
      httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${
        req.originalUrl
      }`;
      httpRequest.protocol = `HTTP/${req.httpVersion}`;
      httpRequest.remoteIp = req.clientIp; // this includes both ipv6 and ipv4 addresses separated by ':'
      httpRequest.remoteIp =
        req.clientIp.indexOf(':') >= 0
          ? req.clientIp.substring(req.clientIp.lastIndexOf(':') + 1)
          : req.clientIp; // just ipv4
      httpRequest.requestSize = req.socket.bytesRead;
      httpRequest.userAgent = req.get('User-Agent');
      httpRequest.referrer = req.get('Referrer');
      meta.user = req.user;
    }

    if (res) {
      meta.httpRequest = httpRequest;
      httpRequest.status = res.statusCode;
      httpRequest.latency = {
        seconds: Math.floor(res.responseTime / 1000),
        nanos: (res.responseTime % 1000) * 1000000
      };
      if (res.body) {
        if (typeof res.body === 'object') {
          httpRequest.responseSize = JSON.stringify(res.body).length;
        } else if (typeof res.body === 'string') {
          httpRequest.responseSize = res.body.length;
        }
      }
    }
    return meta;
  }
});

const createLogger = (module) => ({
  getLogger() {
    return logger;
  },
  getExpressWinstonMiddleware() {
    return expressWinstonMiddleware;
  },
  getExpressWinstonErrorMiddleware() {
    return expressWinstonErrorMiddleware;
  },
  info(message) {
    return logger.info(message, {
      labels: {
        module: module.id
      }
    });
  },
  error(message) {
    return logger.error(message, {
      labels: {
        module: module.id
      }
    });
  },
  debug(message) {
    return logger.debug(message, {
      labels: {
        module: module.id
      }
    });
  },
  warn(message) {
    return logger.warn(message, {
      labels: {
        module: module.id
      }
    });
  },
  log(message) {
    return logger.log(message, {
      labels: {
        module: module.id
      }
    });
  }
});

module.exports = createLogger;
