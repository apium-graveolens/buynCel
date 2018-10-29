const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

//UN-AUTH ROUTES

//Create a user
router.post('/', async (req, res, next) => {
    try {
        let newUser = await db.User.create(req.body)
        res.send(newUser)
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

//Get all users
router.get('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false){
            return res.sendStatus(401)
        }
        let users = await db.User.findAll({})
        res.send(users)
    } catch (ex) {
        next(ex)
    }
})

//Get user by Id
router.get('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if ((reqUser.toString() !== req.params.id) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let user = await db.User.findById(req.params.id)
        res.send(user)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router