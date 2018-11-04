const Seq = require('sequelize');
const conn = require('../connection');

const User = conn.define('user', {
  email: {
    type: Seq.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Seq.STRING,
    allowNull: true
  },
  isAdmin: {
    type: Seq.BOOLEAN,
    defaultValue: false
  },
  savedAddress: {
    type: Seq.STRING
  },
  savedPaymentMethod: {
    type: Seq.STRING
  }
});

module.exports = User;