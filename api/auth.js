const express = require('express')
const router = express.Router()

const jwt = require('jwt-simple')

const {User} = require('../db')

router.post('/', async (req, res, next) => {
    try {
        let authUser = await User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      })
      if (!authUser){
        return next({ status: 401 })
      }
      const token = jwt.encode({id: authUser.id}, process.env.JWT_SECRET)
      res.send({token})
    } catch (ex) {
      next(ex)
    }
  })
  
  router.get('/', async (req, res, next) => {
    if (!req.user){
      return next({ status: 401})
    }
    res.send(req.user)
  })

  module.exports = router