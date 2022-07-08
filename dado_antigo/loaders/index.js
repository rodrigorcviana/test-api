const expressLoader = require('./express');
const load = require('./loadData');

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
};

// console.log('init');
// load.loadQuadras();
