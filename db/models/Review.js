const Seq = require('sequelize');
const conn = require('../connection');

const Review = conn.define('review', {
  content: {
    type: Seq.TEXT,
    validate: {
      len: {
        args: [10, 17000], //TODO: figure out how to remove max value(17000)
        msg: 'Minimum of 10 characters required'
      }
    },
  },
});

module.exports = Review;
