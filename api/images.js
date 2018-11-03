const express = require('express')
const router = express.Router()

const db = require('../db')

const base64Images = require('../db/models/data/base64Images')

const checkAdmin = require('./checkAdmin')

//UN-AUTH ROUTES

//Get images by productId
router.get('/product/:id', async (req, res, next) => {
    try {
        let productImages = await db.Image.findAll({
            where: {
                productId: req.params.id
            }
        })
        if (!productImages.length){
            let defaultImage = {data: base64Images.default}
            productImages.push(defaultImage)
        }
        res.send(productImages)
    } catch (ex) {
        next(ex)
    }
})

//AUTH ROUTES

//Auth Middleware
router.use('/', async (req, res, next) => {
    if (!req.user) {
        res.sendStatus(401)
    } else {
        next()
    }
})

//Add Image to a Product
router.post('/product/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
        let newImage = await db.Image.create({
            data: req.body.data,
            productId: req.params.id
        })
        res.send(newImage)
    } catch (ex) {
        next(ex)
    }
})

//Delete an Image
router.delete('/:id', async (req, res, next) => {
    try {
        let reqUser = req.user.dataValues.id
        if (await checkAdmin(reqUser) === false) {
            return res.sendStatus(401)
        }
        await db.Image.destroy({
            where: {
                id: req.params.id
            }
        })
        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router
