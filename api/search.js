const express = require('express')
const router = express.Router()

router.get('/:term', (req, res, next) => {
  const { term } = req.params;
  console.log('term', term);

  res.send('This will be the search result');
});

module.exports = router;