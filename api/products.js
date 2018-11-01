const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

//UN-AUTH ROUTES

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

//Get products by Category
router.get('/category/:id', async (req, res, next) => {
    try {
        let productsByCategory = await db.Product.findAll({
            where: {
                categoryId: req.params.id
            }
        })
        res.send(productsByCategory)
    } catch (ex) {
        next(ex)
    }
})

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user){
        res.sendStatus(401)
    } else {
        next()
    }
})

//Create a Product
router.post('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false){
            return res.sendStatus(401)
        }
        let newProduct = await db.Product.create(req.body)
        res.send(newProduct)
    } catch (ex) {
        next(ex)
    }
})

//Edit a Product
router.put('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false){
            return res.sendStatus(401)
        }
        let editedProduct = await db.Product.findById(req.params.id)
        await editedProduct.update(req.body)
        res.send(editedProduct)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router