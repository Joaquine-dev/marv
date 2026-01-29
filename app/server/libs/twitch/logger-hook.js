// @twurple v7 uses a different logging system
// This file is kept for backward compatibility but logging
// is now handled through the @twurple built-in logger configuration

const loggers = require("../loggers");
const logger = loggers.get("twitch");

// Export a custom logger that can be used with @twurple
module.exports = {
  custom: {
    error: (message) => logger.error(`[twurple] ${message}`),
    warn: (message) => logger.warn(`[twurple] ${message}`),
    info: (message) => logger.info(`[twurple] ${message}`),
    debug: (message) => logger.debug(`[twurple] ${message}`),
    trace: (message) => logger.debug(`[twurple] ${message}`),
    crit: (message) => logger.error(`[twurple] ${message}`),
  },
};
