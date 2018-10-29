const Seq = require('sequelize');
const conn = require('../connection');

const Product = conn.define('product', {
    title: {
        type: Seq.STRING,
        allowNull: false
    },
    description: {
        type: Seq.STRING,
        allowNull: false
    },
    price: {
        type: Seq.INTEGER,
        allowNull: false
    },
    photo: {
        type: Seq.STRING,
        allowNull: false,
        defaultValue: '/default.png'
    }
})

module.exports = Product