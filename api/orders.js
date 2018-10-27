const express = require('express')
const router = express.Router()

const db = require('../db')

//Get all orders
router.get('/', async (req, res, next) => {
    try {
        let orders = await db.Order.findAll({})
        res.send(orders)
    } catch (ex) {
        next(ex)
    }
})

//Get order by Id
router.get('/:id', async (req, res, next) => {
    try {
        let order = await db.Order.findById(req.params.id)
        res.send(order)
    } catch (ex) {
        next(ex)
    }
})

//Get orders by Status
router.get('/status/:status', async (req, res, next) => {
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
router.get('/user/:id', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
    try {
        let newOrder = await db.Order.create(req.body)
        res.send(newOrder)
    } catch (ex) {
        next(ex)
    }
})

//Edit an Order
router.put('/:id', async (req, res, next) => {
    try {
        let editedOrder = await db.Order.findById(req.params.id)
        await editedOrder.update(req.body) 
        res.send(editedOrder)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router