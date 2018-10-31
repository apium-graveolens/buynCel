const express = require('express')
const router = express.Router()

const db = require('../db')

//UN-AUTH ROUTES

//Get all categories
router.get('/', async (req, res, next) => {
    try {
        let categories = await db.Category.findAll({})
        res.send(categories)
    } catch (ex) {
        next(ex)
    }
})

//Get all products by category
router.get('/:id', async (req, res, next) => {
    try {
        let categoryProducts = await db.Product.findAll({
            where: {
                categoryId: req.params.id
            }
        })
        res.send(categoryProducts)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router