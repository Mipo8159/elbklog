import pino from "pino";
import pretty from "pino-pretty";

const logger = pino(pretty());

logger.level = process.env.LOG_LEVEL || "trace";

logger.fatal("fatal message");
logger.error("error message");
logger.warn("warn message");
logger.info("info message");
logger.debug("debug message");
logger.trace("trace message");
