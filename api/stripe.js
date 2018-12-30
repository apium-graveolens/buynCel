const express = require('express')
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_KEY || "sk_test_4eC39HqLyjWDarjtT1zdp7dc");

router.post('/', async (req, res, next) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body.token
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
})

module.exports = router;