import morgan from "morgan";
import logger from "./logger.js";

const morganFormat = `
{
    "method":":method",
    "url":":url",
    "status":":status",
    "response-time":":response-time"
}`;

function messageHandler(message) {
  logger.info("Request received", JSON.parse(message.trim()));
}

const morganMiddleware = morgan(morganFormat, {
  stream: { write: messageHandler },
});

export default morganMiddleware;
