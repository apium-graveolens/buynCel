const Seq = require('sequelize');
const conn = require('../connection');

const User = require('./User')

const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2'); //<--This is a test key

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
    isPaid: {
        type: Seq.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: Seq.STRING,
        allowNull: true
    },
    address: {
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
        from: 'LexBedwell',
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

Order.prototype.sendReceivedEmail = async function () {
    let orderEmail = await User.findById(this.userId)
    orderEmail = orderEmail.dataValues.email

    setEmailCredentials()
    let userObj = {
        email: orderEmail,
        orderId: this.id,
        text: 'Order Received'
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Message sent! - ORDER RECIEVED');
        }
    })
}

Order.prototype.sendShippedEmail = async function () {
    let orderEmail = await User.findById(this.userId)
    orderEmail = orderEmail.dataValues.email

    setEmailCredentials()
    let userObj = {
        email: orderEmail,
        orderId: this.id,
        text: 'Order Shipped'
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Message sent! - ORDER SHIPPED');
        }
    })
}

Order.prototype.sendDeliveredEmail = async function () {
    let orderEmail = await User.findById(this.userId)
    orderEmail = orderEmail.dataValues.email

    setEmailCredentials()
    let userObj = {
        email: orderEmail,
        orderId: this.id,
        text: 'Order Delivered'
    }
    mailOptions = generateEmail(userObj)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Message sent! - ORDER DELIVERED');
        }
    })
}

Order.prototype.payWithStripe = async function () {
    //**Example TEST DATA**
    const charge = await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: 'tok_amex',
        description: 'My first payment'
    });
    if (charge.paid === true) {
        this.isPaid = true
        console.log('Paid!')
    } else {
        console.log('Payment failed!')
    }
    return (this)
}

module.exports = Order