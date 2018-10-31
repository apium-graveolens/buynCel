const Seq = require('sequelize');
const conn = require('../connection');

const Order = conn.define('order', {
    id: {
      type: conn.Sequelize.UUID,
      defaultValue: conn.Sequelize.UUIDV4,
      primaryKey: true
    },
    status: {
      type: conn.Sequelize.ENUM('cart', 'order'),
      allowNull: false,
      defaultValue: 'cart'
    }
});

module.exports = Order