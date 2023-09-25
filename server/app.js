// checking for production mode to load the environment files

const express = require("express");
const apiRouter = require("./routes/api");
const webRouter = require("./routes/web");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// if env por available the it will go for this port instead od 8081
const PORT = process.env.PORT || 3000;

// starting the server
app.listen(PORT, () => {
  console.log(`Server is Listening on: ${PORT}`);
});

// accepting json file upto 10mb
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// set the static folder to /public where all the react build and the others files are available
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// use url encoder for get the data
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(morgan("common"));

// use the api routes to /api
app.use("/api/v1", apiRouter);

// use the web routes to default
app.use(webRouter);

/**
 * -------------------------------------------------------------------------------------------------
 * JavaScript error events
 *
 * uncaughtException :
 * When a JavaScript error is not properly handled, an uncaughtException is emitted.
 * These suggest the programmer has made an error, and they should be treated with the utmost
 * priority. Usually, it means a bug occurred on a piece of logic that needed more testing,
 * such as calling a method on a null type.
 *
 * unhandledRejection:
 * An unhandledRejection error is a newer concept. It is emitted when a promise is not satisfied;
 * in other words, a promise was rejected (it failed), and there was no handler attached to respond.
 * These errors can indicate an operational error or a programmer error,
 * and they should also be treated as high priority.
 *
 * -------------------------------------------------------------------------------------------------
 */
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
});

module.exports = app;
