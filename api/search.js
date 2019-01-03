const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');

const { Product } = require('../db')

//TODO: be able to search for category and descreiption as well, maybe with a weighting scheme

router.get('/:term', (req, res, next) => {
  //make lookup case insensetive 
  // const lowerCaseTerm = req.params.term.toLowerCase();
  // Product.findAll({
  //   where: {
  //     title: {
  //       $like: '%' + lowerCaseTerm + '%'
  //     }
  //   }
  // })
  //   .then(products => res.send(products))
  //   .catch(next);

  const { term } = req.params;
  Product.searchTitle(term)
    .then(productMatches => res.send(productMatches))
    .catch(next);
});

module.exports = router;