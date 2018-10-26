const Seq = require('sequelize');
const conn = new Seq(process.env.DATABASE_URL);

module.exports = conn;