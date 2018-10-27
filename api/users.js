const express = require('express')
const router = express.Router()

const db = require('../db')

//Get all users
router.get('/', async (req, res, next) => {
    try {
        let users = await db.User.findAll({})
        res.send(users)
    } catch (ex) {
        next(ex)
    }
})

//Get user by Id
router.get('/:id', async (req, res, next) => {
    try {
        let user = await db.User.findById(req.params.id)
        res.send(user)
    } catch (ex) {
        next(ex)
    }
})

//Create a user
router.post('/', async (req, res, next) => {
    try {
        let newUser = await db.User.create(req.body)
        res.send(newUser)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router