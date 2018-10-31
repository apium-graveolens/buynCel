const express = require('express')
const router = express.Router()

const jwt = require('jwt-simple')

const {User} = require('../db')

router.use(express.json())

//AUTH MIDDLEWARE
router.use( async (req, res, next) => {
    const token = req.headers.authorization
    if (!token){
      return next()
    }
    try {
      let decodedToken = jwt.decode(token, process.env.JWT_SECRET)
      let id = decodedToken.id
      req.user = await User.findByPk(id)
      next()
    } catch (ex){
      next({status: 401})
    }
})

//AUTH ROUTES
router.use('/auth', require('./auth'))

//USER ROUTES
router.use('/users', require('./users'))

//PRODUCT ROUTES
router.use('/products', require('./products'))

//CATEGORY ROUTES
router.use('/categories', require('./categories'))

//ORDER ROUTES
router.use('/orders', require('./orders'))

//LINE ITEM ROUTES
router.use('/lineitems', require('./lineitems'))

module.exports = router