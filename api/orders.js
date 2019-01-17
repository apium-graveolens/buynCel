const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user) {
        console.log("No req.user");
        res.sendStatus(401)
    } else {
        next()
    }
})

//Get all orders
router.get('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
        let orders = await db.Order.findAll({})
        res.send(orders)
    } catch (ex) {
        next(ex)
    }
})

//Get order by Id
router.get('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        let order = await db.Order.findById(req.params.id)
        if ((reqUser !== order.dataValues.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        res.send(order)
    } catch (ex) {
        next(ex)
    }
})

//Get orders by Status
router.get('/status/:status', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
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
        let reqUser = req.user.dataValues.id
        if ((reqUser.toString() !== req.params.id) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let ordersByUser = await db.Order.findAll({
            include: [db.LineItem],
            where: {
                userId: req.params.id
            }
        })
        if (ordersByUser.length == 0) {
            // const firstOrder = await db.Order.create({
            //     status: 'cart',
            //     userId: req.params.id
            // });
            // ordersByUser = [firstOrder]

            await db.Order.create({
                status: 'cart',
                userId: req.params.id
            });
            ordersByUser = await db.Order.findAll({
                include: [db.LineItem],
                where: {
                    userId: req.params.id
                }
            })

        }
        res.send(ordersByUser)
    } catch (ex) {
        next(ex)
    }
})

//Create an order
router.post('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if ((reqUser !== req.body.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let newOrder = await db.Order.create(req.body)
        await newOrder.sendReceivedEmail()
        if (req.body.payWithStripe === true) {
            await newOrder.payWithStripe()
        }
        res.send(newOrder)
    } catch (ex) {
        next(ex)
    }
})

//Edit an Order
router.put('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        let order = await db.Order.findById(req.params.id)
        if ((reqUser !== order.dataValues.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let editedOrder = await db.Order.findById(req.params.id)
        await editedOrder.update(req.body)

        //if completing a placed order,
        //initialize a new 'cart' order
        console.log('reqUser', reqUser)
        await db.Order.create({
            status: 'cart',
            userId: reqUser
        });
        res.send(editedOrder)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router