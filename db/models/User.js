const Seq = require('sequelize');
const conn = require('../connection');

const User = conn.define('user', {
  name: {
    type: Seq.STRING,
  },
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
  address: {
    type: Seq.STRING
  },
  addressCity: {
    type: Seq.STRING
  },
  addressState: {
    type: Seq.STRING
  },
  addressZip: {
    type: Seq.STRING
  },
  savedPaymentMethod: {
    type: Seq.STRING
  }
});

module.exports = User;