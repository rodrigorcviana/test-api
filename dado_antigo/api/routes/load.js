const express = require('express');
const controller = require('../controllers/controller')

const route = express.Router();

module.exports = (server) => {
  server.use('', route);

  route.get('/quadras', controller.loadQ);
  route.get('/testada', controller.loadT);
};
