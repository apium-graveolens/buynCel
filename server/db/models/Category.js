const Seq = require('sequelize')
const conn = require('../connection');

const Category = conn.define('category', {
    name: {
        type: Seq.STRING,
        allowNull: false
    }
})

module.exports = Category