const express = require('express')
var router = express.Router();
var nodemailer = require('nodemailer');

try {
    Object.assign(process.env, require('./.env.js'))
  } catch (ex) {
    console.log(ex)
  }

let transporter
let mailOptions

let generateEmail = (userData) => {
    return {
        from: 'LexBedwell>', 
        to: userData.email, 
        subject: 'Order Received', 
        text: `${userData.text} ${userData.orderId}` 
    }
}

const setEmailCredentials = () => {
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USERNAME, 
            pass: process.env.GMAIL_PASSWORD 
    }
  })
}

//AUTH ROUTES

router.post('/order_received', (req, res, next) => {
    if (req.body.serverKey !== process.env.SERVER_KEY){
        return res.sendStatus(401)
    }
    setEmailCredentials()
    let userObj = {
        email: req.body.email,
        orderId: req.body.orderId,
        text: "Order Received"
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            next(error)
        } else {
            console.log('Message sent! - ORDER RECIEVED');
        }
    })
});

router.post('/order_shipped', (req, res, next) => {
    if (req.body.serverKey !== process.env.SERVER_KEY){
        return res.sendStatus(401)
    }
    setEmailCredentials()
    let userObj = {
        email: req.body.email,
        orderId: req.body.orderId,
        text: "Order Shipped"
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            next(error)
        } else {
            console.log('Message sent! - ORDER SHIPPED');
        }
    })
});

router.post('/order_delivered', (req, res, next) => {
    if (req.body.serverKey !== process.env.SERVER_KEY){
        return res.sendStatus(401)
    }
    setEmailCredentials()
    let userObj = {
        email: req.body.email,
        orderId: req.body.orderId,
        text: "Order Delivered"
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            next(error)
        } else {
            console.log('Message sent! - ORDER DELIVERED');
        }
    })
});


module.exports = router