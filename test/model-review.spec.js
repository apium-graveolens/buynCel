import { expect } from 'chai'
import { models, syncSeed } from '../db';
const { Review } = models;

describe('Review Model', () => {
  describe('content field', () => {
    beforeEach(() => syncSeed());

    it('must be at least 10 characters long', () => {
      return Review.create({ content: 'I am at least 10 characters long' })
        .then(review => expect(review).to.be.ok)
        .then(() => Review.create({ content: 'short' }))
        .catch(err => expect(err.message).to.eql('Validation error: Minimum of 10 characters required'))
    });
    it('can be very long', () => {
      let content = '';
      for (let i = 0; i < 500; i++) content += 'this string is 33 characters long';
      //500 * 33 = 16,500
      return Review.create({ content })
        .then(review => expect(review.content.length).to.equal(16500))
        .catch(() => expect(true).to.be.false)
    });
    it('belongs to a product', () => {
      return Review.create({ content: 'this product is of average quality' })
        .then(review => expect(review.productId).to.be.null)
    });
    it('belongs to a user', () => {
      return Review.create({ content: 'this product is of average quality' })
        .then(review => expect(review.userId).to.be.null)
    });
  });
})