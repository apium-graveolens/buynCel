const Seq = require('sequelize');
const conn = require('../connection');

const Category = require('./Category');
const Review = require('./Review');

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
        type: Seq.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Seq.INTEGER,
        allowNull: false
    },
    photo: {
        type: Seq.STRING,
        allowNull: false,
        defaultValue: '/default.png'
    }
})

Product.searchTitle = async function (searchTerm) {
    searchTerm = searchTerm.toLowerCase()
    let totalArr = await Product.findAll({
        include: [Category]
    })
    let searchArr = []

    totalArr.forEach(elem => {
        if (elem.title.toLowerCase().indexOf(searchTerm) !== -1 && elem.quantity > 0) {
            searchArr.push(elem)
        }
    })
    return searchArr
}

Product.getActiveProducts = async function () {
    let totalArr = await Product.findAll({
        include: [Category, Review]
    })
    let activeArr = []

    totalArr.forEach(elem => {
        if (elem.quantity > 0) {
            activeArr.push(elem)
        }
    })
    return activeArr
}

module.exports = Product