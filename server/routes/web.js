const express = require("express");
const path = require("path");
const webRouter = express.Router();

// all the request come from the server are handled using the react so it will
// point to the build html file of react.

try {
  webRouter.get("*", (req, res) => {
    console.log("sdfjsldfjlsjkd");
    res.sendFile(path.resolve(__dirname, "../public", "index.html"));
  });
} catch (error) {
  console.log(error);
}

module.exports = webRouter;
