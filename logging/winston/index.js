import winston from "winston";

// (SGR) Constants in the terminal
const SGR_COLORS = {
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
};

/* Escape Sequence */
const ESC = "\x1B";

/* Control Sequence Introducer */
const CSI = "[";

/* Generates the ANSI escape code for the SGR effect */
const generateSGR = (sgrEffects) => `${ESC}${CSI}${sgrEffects.join(";")}m`;

const SGR_RESET = 0;

const colorize = (text, color) =>
  generateSGR([SGR_COLORS[color]]) + text + generateSGR([SGR_RESET]);

/* Custom format for console logs. Uses winston printf and applies a template with the log fields. */
const myFormat = winston.format.printf(
  ({ service, message, buildInfo, timestamp, level }) => {
    const timestampColor = colorize(timestamp, "green");
    const serviceColor = colorize(service, "magenta");
    const versionColor = colorize(buildInfo.version, "blue");
    const nodeVersionColor = colorize(`node${buildInfo.nodeVersion}`, "yellow");

    return `${timestampColor} [${serviceColor}-${versionColor}-${nodeVersionColor}] ${level}: ${message}`;
  }
);

const logger = winston.createLogger({
  // Level for the logger. Try changing it to different values
  level: process.env.LOG_LEVEL || "silly",
  // Format that combines colors for the levels, timestamps and our custom format
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    myFormat
  ),
  // Extra metadata fields for every log line
  defaultMeta: {
    service: "winstonize",
    buildInfo: {
      nodeVersion: process.version,
      version: "1.0.0",
    },
  },
  transports: [
    // Log to the console with all the parameters from above
    new winston.transports.Console(),
    // Log only errors to a file, in JSON format and without ANSI color codes
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.uncolorize(),
        winston.format.json()
      ),
    }),
  ],
});

logger.error("error message");
logger.warn("warn message");
logger.info("info message");
logger.http("http message");
logger.verbose("verbose message");
logger.debug("debug message");
logger.silly("silly message");
