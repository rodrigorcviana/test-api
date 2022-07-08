const Sequelize = require('sequelize');
const initModels = require('./init-models');

const config = require('../config/database.js');

const sequelize = new Sequelize(config);

const db = initModels(sequelize);

sequelize.sync();

module.exports = db;
