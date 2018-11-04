const express = require('express')
const router = express.Router()

const db = require('../db')

const checkAdmin = require('./checkAdmin')

//UN-AUTH ROUTES

//Create a user
router.post('/', async (req, res, next) => {
    try {
        let userToCreate = req.body
        let newUser = await db.User.create({ ...userToCreate, isAdmin: false })
        res.send(newUser)
    } catch (ex) {
        next(ex)
    }
})

// router.get('/:id/name', async (req, res, next) => {
//     try {
//         let user = await db.User.findById(req.params.id)
//         res.send(user.email)
//     } catch (ex) {
//         next(ex)
//     }
// })

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(401)
    } else {
        next()
    }
})

//Get all users
router.get('/', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
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

//Edit user
router.put('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if ((reqUser.toString() !== req.params.id) && (!await checkAdmin(reqUser))) {
            return res.sendStatus(401)
        }
        let newUserData = req.body
        let editedUser = await db.User.findById(req.params.id)
        await editedUser.update({ ...newUserData, isAdmin: false })
        res.send(editedUser)
    } catch (ex) {
        next(ex)
    }
})

//Delete a User
router.delete('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
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

//Toggle user Admin Status
router.get('/:id/toggleadmin', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
        let editedUser = await db.User.findById(req.params.id)
        if (editedUser.isAdmin === false) {
            await editedUser.update({ isAdmin: true })
        } else {
            await editedUser.update({ isAdmin: false })
        }
        res.send(editedUser)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router