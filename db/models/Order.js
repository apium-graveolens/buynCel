const Seq = require('sequelize');
const conn = require('../connection');

const User = require('./User')

var nodemailer = require('nodemailer');

const Order = conn.define('order', {
    id: {
      type: conn.Sequelize.UUID,
      defaultValue: conn.Sequelize.UUIDV4,
      primaryKey: true
    },
    status: {
      type: conn.Sequelize.ENUM('cart', 'created', 'processing', 'cancelled', 'completed', 'delivered'),
      allowNull: false,
      defaultValue: 'cart'
    },
    addressName: {
      type: Seq.STRING,
      allowNull: true
    },
    addressLine: {
      type: Seq.STRING,
      allowNull: true
    },
    addressCity: {
      type: Seq.STRING,
      allowNull: true
    },
    addressState: {
      type: Seq.STRING,
      allowNull: true
    },
    addressZip: {
      type: Seq.STRING,
      allowNull: true
    }
});

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

Order.prototype.sendReceivedEmail = async function(){
    let orderEmail = await User.findById(this.userId)
    orderEmail = orderEmail.dataValues.email

    setEmailCredentials()
    let userObj = {
        email: orderEmail,
        orderId: this.id,
        text: "Order Received"
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log('Message sent! - ORDER RECIEVED');
        }
    })
}

Order.prototype.sendShippedEmail = async function(){
  let orderEmail = await User.findById(this.userId)
  orderEmail = orderEmail.dataValues.email

  setEmailCredentials()
  let userObj = {
      email: orderEmail,
      orderId: this.id,
      text: "Order Shipped"
  }
  mailOptions = generateEmail(userObj)
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error)
      } else {
          console.log('Message sent! - ORDER SHIPPED');
      }
  })
}

Order.prototype.sendDeliveredEmail = async function(){
  let orderEmail = await User.findById(this.userId)
  orderEmail = orderEmail.dataValues.email

  setEmailCredentials()
  let userObj = {
      email: orderEmail,
      orderId: this.id,
      text: "Order Delivered"
  }
  mailOptions = generateEmail(userObj)
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error)
      } else {
          console.log('Message sent! - DELIVERED');
      }
  })
}

module.exports = Order