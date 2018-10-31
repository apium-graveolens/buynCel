const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

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

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user){
        res.sendStatus(401)
    } else {
        next()
    }
})

//Create a Category
router.post('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false){
            return res.sendStatus(401)
        }
        let newProduct = await db.Category.create(req.body)
        res.send(newProduct)
    } catch (ex) {
        next(ex)
    }
})

//Edit a Category
router.put('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false){
            return res.sendStatus(401)
        }
        let editedCategory = await db.Category.findById(req.params.id)
        await editedCategory.update(req.body)
        res.send(editedCategory)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router