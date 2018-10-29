const express = require('express')
const router = express.Router()

const db = require('../db')

//Create a Line Item
router.post('/', async (req, res, next) => {
    try {
        let newLineItem = await db.LineItem.create(req.body)
        res.send(newLineItem)
    } catch (ex) {
        next(ex)
    }
})

//Delete a Line Item
router.delete('/:id', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {
    try {
        let editedLineItem = await db.LineItem.findById(req.params.id)
        await editedLineItem.update(req.body) 
        res.send(editedLineItem)
    } catch (ex) {
        next(ex)
    }
})

module.exports = router