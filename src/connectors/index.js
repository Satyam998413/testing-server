const slack = require('./slack');
const gmail = require('./gmail');

const connectors = {
  slack,
  gmail
};

module.exports = connectors;
