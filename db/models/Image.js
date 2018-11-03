const Seq = require('sequelize');
const conn = require('../connection')

const Image = conn.define('image', {
    data: {
        type: conn.Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Image