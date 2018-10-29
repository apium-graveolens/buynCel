const express = require('express')
const router = express.Router()

const db = require('../db')

//Get all products
router.get('/', async (req, res, next) => {
    try {
        let products = await db.Product.findAll({})
        res.send(products)
    } catch (ex) {
        next(ex)
    }
})

//Get product by Id
router.get('/:id', async (req, res, next) => {
    try {
        let product = await db.Product.findById(req.params.id)
        res.send(product)
    } catch (ex) {
        next(ex)
    }
})

//Get product by Catagory
router.get('/category/:category', async (req, res, next) => {
    try {
        let productsByCategory = await db.Product.findAll({
            where: {
                category: req.params.category
            }
        })
        res.send(productsByCategory)
    } catch (ex) {
        next(ex)
    }
})

//Create a Product
router.post('/', async (req, res, next) => {
    try {
        let newProduct = await db.Product.create(req.body)
        res.send(newProduct)
    } catch (ex) {
        next(ex)
    }
})

//Edit a Product
router.put('/:id', async (req, res, next) => {
    try {
        let editedProduct = await db.Product.findById(req.params.id)
        await editedProduct.update(req.body)
        res.send(editedProduct)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router