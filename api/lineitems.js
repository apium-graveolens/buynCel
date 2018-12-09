const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401)
    } else {
        next()
    }
})

//Get all lineitems
router.get('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
        let lineItems = await db.LineItem.findAll({})
        res.send(lineItems)
    } catch (ex) {
        next(ex)
    }
})

//Create a Line Item
router.post('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if ((reqUser !== req.body.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let newLineItem = await db.LineItem.create(req.body)
        res.send(newLineItem)
    } catch (ex) {
        next(ex)
    }
})

//Get all of a user's Line Items

router.get('/user/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if ((reqUser !== req.params.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let lineItems = await db.LineItem.findAll({
            include: [db.Product],
            where: {
                userId: reqUser,
            },
        });
        res.send(lineItems)
    } catch (ex) {
        next(ex)
    }
})

//Get a user's cart Line Items
router.get('/user/:userId/cart/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        console.log(typeof reqUser);
        console.log(typeof req.params.userId)
        if ((reqUser !== req.params.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let lineItems = await db.LineItem.findAll({
            include: [db.Product],
            where: {
                userId: reqUser,
                orderId: req.params.id
            },
        });
        res.send(lineItems)
    } catch (ex) {
        next(ex)
    }
})

//Delete a Line Item
router.delete('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        let lineItem = await db.LineItem.findById(req.params.id)
        if ((reqUser !== lineItem.dataValues.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
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
router.put('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        let lineItem = await db.LineItem.findById(req.params.id)
        if ((reqUser !== lineItem.dataValues.userId) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        await lineItem.update(req.body)
        res.send(lineItem)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router