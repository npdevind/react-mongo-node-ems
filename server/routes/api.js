const express = require("express");
const features = require("../features");
const cors = require("cors");
const apiRouter = express.Router();

// Use the cors middleware to handle CORS headers
apiRouter.use(cors());

// Use the features middleware
apiRouter.use(features);

// Error handling middleware
apiRouter.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (req.headers.accept === "application/json") {
    // Send a JSON response with status code
    res.status(500).json({ error: err.message });
  } else {
    // For non-JSON requests, you can send an HTML or text response
    res.status(500).send(`An error occurred: ${err.message}`);
  }
});

module.exports = apiRouter;
