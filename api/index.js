const express = require('express')
const router = express.Router()

const db = require('../db')

//USER ROUTES
router.use('/users', require('./users'))

//PRODUCT ROUTES
router.use('/products', require('./products'))

//ORDER ROUTES
router.use('/orders', require('./orders'))

//LINE ITEM ROUTES
router.use('/lineitems', require('./lineitems'))

module.exports = router