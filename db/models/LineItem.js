const Seq = require('sequelize')
const conn = require('../connection');

const LineItem = conn.define('lineItem', {
    quantity: {
      type: conn.Sequelize.INTEGER,
      defaultValue: 1
    },
});

module.exports = LineItem