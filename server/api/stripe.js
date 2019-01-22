const express = require('express')
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_KEY || 'sk_test_bh2s2qp3B0Nxv9aRO3G8B82B');

router.post('/', async (req, res, next) => {
  try {
    const { token, amount } = req.body;
    console.log('amount:', amount);
    const amountInCents = amount * 100;
    let { status } = await stripe.charges.create({
      amount: amountInCents,
      currency: "usd",
      description: "An example charge",
      source: token
    });

    res.json({ status });
  } catch (err) {
    console.log('stripe error:', JSON.stringify(err))
    next(err)
  }
});

module.exports = router;