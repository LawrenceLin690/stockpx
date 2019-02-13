const Sequelize = require('sequelize');
const db = require('../db');

const Purchase = db.define('purchase', {
  ticker: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Purchase;
