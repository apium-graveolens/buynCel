const express = require('express')
const router = express.Router()

const axios = require('axios')

const jwt = require('jwt-simple')

const {User} = require('../db')

try {
  Object.assign(process.env, require('./.env.js'))
} catch (ex) {
  console.log(ex)
}

//TOKEN AUTH ROUTES

//Send user their token
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
  
//Send user their Id
router.get('/', async (req, res, next) => {
  if (!req.user){
    return next({ status: 401})
  }
  res.send(req.user)
})

//OAUTH ROUTES

//Get Facebook Code
router.get('/facebook', async (req, res, next) => {
  const url = `https://www.facebook.com/v3.2/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&state=${process.env.FACEBOOK_STATE}&scope=email`
  res.redirect(url)
})

//Exchange Facebook Code for Access Tokens and Facebook Email, send user token for our site
router.get('/facebook/callback', async (req, res, next) => {
  try {
    let response = await axios.get(`https://graph.facebook.com/v3.2/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_SECRET}&code=${req.query.code}`)
    let access_token = response.data.access_token

    response = await axios.get(`https://graph.facebook.com/me?fields=email&access_token=${access_token}`)
    let facebookData = response.data
    console.log(facebookData)

    let user = await User.findOne({
      where: {
        facebookEmail: facebookData.email
      }
    })
    if (!user){
      res.redirect('/sign-up')
    }
    const token = jwt.encode({id: user.id}, process.env.JWT_SECRET)
    res.send({token})
  } catch (ex) {
      next(ex)
    }
})

module.exports = router

