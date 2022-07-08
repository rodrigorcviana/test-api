const express = require('express');
const load = require('./routes/load');

module.exports = () => {
  const app = express.Router();
  const server = express.Router();
  app.use('/load', server);

  load(server);

  return app;
};
