# Logging with Winston

This example shows how to use the [Winston](https://github.com/winstonjs/winston) logger in a Node.js application.

This example logs to the console as well as to a file. The console uses the `silly` level and a custom format, while the file uses the `error` level and JSON format.

## Running the example

```bash
npm install
npm start
```

You can also specify a log level using the `LOG_LEVEL` environment variable:

```bash
LOG_LEVEL=error npm start
```