const Seq = require('sequelize');
const conn = new Seq(process.env.DATABASE_URL || 'postgres://localhost/celery-test', { logging: false });

module.exports = conn;