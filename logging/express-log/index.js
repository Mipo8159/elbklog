import express from "express";
import morganMiddleware from "./morganMiddleware.js";
import logger from "./logger.js";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// HTTP requests, goes before the routes (auto log collection)
app.use(morganMiddleware);

app.post("/test-error", (req, res) => {
  // logger.info(JSON.stringify(req.body));
  res.status(500).send("some problem");
});

app.post("/test", (req, res) => {
  logger.info(req);
  res.status(200).send("all good");
});

app.get("/", (req, res) => {
  const response = "Hello World!";
  // logger.debug("Sending message", { response });
  res.status(200).send(response);
});

app.get("/error", (req, res) => {
  throw new Error("Error route triggered!");
});

// Error handler, goes before app. listens to catch all errors
app.use((err, req, res, next) => {
  logger.error(err.message, { error: err, stackTrace: err.stack });
  res.status(500).send("Something failed.");
});

app.listen(PORT, () => {
  logger.info("Server started", { port: PORT });
});
