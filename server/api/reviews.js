const express = require('express')
const router = express.Router()

const db = require('../db')

router.get('/', (req, res, next) => {
  res.send('hey')
});

router.get('/product/:id', async (req, res, next) => {
  try {
    const productReviews = await db.Review.findAll({
      include: [db.User],
      where: {
        productId: req.params.id
      }
    })
    res.send(productReviews);
  } catch (ex) {
    next(ex)
  }
});

router.post('/', async (req, res, next) => {
  try {
    let reqUser = req.user.dataValues.id

    let newReview = await db.Review.create({
      ...req.body,
      userId: reqUser
    })
    res.send(newReview)
  } catch (ex) {
    next(ex)
  }
})


module.exports = router;
