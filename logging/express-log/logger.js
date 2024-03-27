import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: {
    service: "express-logger",
    buildInfo: {
      nodeVersion: process.version,
      commitHash: process.env.COMMIT_HASH || "local",
      version: process.env.VERSION || "1.0.0",
    },
  },

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ message, timestamp, level, service, buildInfo, ...others }) => {
            // Ignore service and buildInfo when logging to the console
            return `${timestamp} ${level}: ${message} ${JSON.stringify(
              others
            )}`;
          }
        )
      ),
    }),

    new winston.transports.File({
      filename: "combined.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

export default logger;
