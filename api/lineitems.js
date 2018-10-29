const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user){
        res.sendStatus(401)
    } else {
        next()
    }
})

//Get all lineitems
router.get('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false){
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

//Delete a Line Item
router.delete('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if ((reqUser.toString() !== req.params.id) && (!await checkAdmin(reqUser))) {
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
        if ((reqUser.toString() !== req.params.id) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let editedLineItem = await db.LineItem.findById(req.params.id)
        await editedLineItem.update(req.body) 
        res.send(editedLineItem)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router