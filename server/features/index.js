const express = require("express");
const features = express.Router();

const auth = require("./auth");

express.Router.group = function (arg1, arg2, arg3) {
  let handlerFunction = arg1;
  let path = "/";
  let middleware = undefined;

  if (arg3) {
    path = arg1;
    middleware = arg2;
    handlerFunction = arg3;
  } else if (arg2) {
    path = arg1;
    handlerFunction = arg2;
  }
  const router = express.Router();
  if (middleware) {
    router.use(middleware);
  }
  handlerFunction(router);

  this.use(path, router);
  return this;
};

features.use(auth);

module.exports = features;
