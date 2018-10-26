const express = require('express')
const router = express.Router()

const db = require('../db')

//USER ROUTES

//Get all users
router.get('/users', async (req, res, next) => {
    try {
        let users = await db.User.findAll({})
        res.send(users)
    } catch (ex) {
        next(ex)
    }
})

//Get user by Id
router.get('/users/:id', async (req, res, next) => {
    try {
        let user = await db.User.findById(req.params.id)
        res.send(user)
    } catch (ex) {
        next(ex)
    }
})

//Create a user
router.post('/users', async (req, res, next) => {
    try {
        let newUser = await db.User.create(req.body)
        res.send(newUser)
    } catch (ex) {
        next(ex)
    }
})

//Delete a user
router.delete('/users/:id', async (req, res, next) => {
    try {
        await db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})

//Edit a user
router.put('/users/:id', async (req, res, next) => {
    try {
        let editedUser = await db.User.findById(req.params.id)
        await editedUser.update(req.body) 
        res.send(editedUser)
    } catch (ex) {
        next(ex)
    }
})


//PRODUCT ROUTES

//Get all products
router.get('/products', async (req, res, next) => {
    try {
        let products = await db.Product.findAll({})
        res.send(products)
    } catch (ex) {
        next(ex)
    }
})

//Get product by Id
router.get('/products/:id', async (req, res, next) => {
    try {
        let product = await db.Product.findById(req.params.id)
        res.send(product)
    } catch (ex) {
        next(ex)
    }
})

//Get product by Catagory
router.get('/products/category/:category', async (req, res, next) => {
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
router.post('/products', async (req, res, next) => {
    try {
        let newProduct = await db.Product.create(req.body)
        res.send(newProduct)
    } catch (ex) {
        next(ex)
    }
})

//Edit a Product
router.put('/products/:id', async (req, res, next) => {
    try {
        let editedProduct = await db.Product.findById(req.params.id)
        await editedProduct.update(req.body)
        res.send(editedProduct)
    } catch (ex) {
        next(ex)
    }
})

//ORDER ROUTES

//Get all orders
router.get('/orders', async (req, res, next) => {
    try {
        let orders = await db.Order.findAll({})
        res.send(orders)
    } catch (ex) {
        next(ex)
    }
})

//Get order by Id
router.get('/orders/:id', async (req, res, next) => {
    try {
        let order = await db.Order.findById(req.params.id)
        res.send(order)
    } catch (ex) {
        next(ex)
    }
})

//Get orders by Status
router.get('/orders/status/:status', async (req, res, next) => {
    try {
        let ordersByStatus = await db.Order.findAll({
            where: {
                status: req.params.status
            }
        })
        res.send(ordersByStatus)
    } catch (ex) {
        next(ex)
    }
})

//Get orders by User
router.get('/orders/user/:id', async (req, res, next) => {
    try {
        let ordersByUser = await db.Order.findAll({
            where: {
                userId: req.params.id
            }
        })
        res.send(ordersByUser)
    } catch (ex) {
        next(ex)
    }
})

//Create an order
router.post('/orders', async (req, res, next) => {
    try {
        let newOrder = await db.Order.create(req.body)
        res.send(newOrder)
    } catch (ex) {
        next(ex)
    }
})

//Edit an Order
router.put('/orders/:id', async (req, res, next) => {
    try {
        let editedOrder = await db.Order.findById(req.params.id)
        await editedOrder.update(req.body) 
        res.send(editedOrder)
    } catch (ex) {
        next(ex)
    }
})

//LINE ITEM ROUTES

//Create a Line Item
router.post('/lineitems', async (req, res, next) => {
    try {
        let newLineItem = await db.LineItem.create(req.body)
        res.send(newLineItem)
    } catch (ex) {
        next(ex)
    }
})

//Delete  a Line Item
router.delete('/lineitems/:id', async (req, res, next) => {
    try {
        await db.LineItem.destroy({
            where: {
                id: req.params.id
            }
        })
        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})

//Edit a Line Item
router.put('/lineitems/:id', async (req, res, next) => {
    try {
        let editedLineItem = await db.LineItem.findById(req.params.id)
        await editedLineItem.update(req.body) 
        res.send(editedLineItem)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router