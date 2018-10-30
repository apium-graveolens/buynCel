import { expect } from 'chai'
import { models, syncSeed } from '../db';
const { User } = models;


describe('User model', () => {
  beforeEach(() => (
    syncSeed()
  ));

  describe('email field', () => {
    //TODO: rethink how to test this
    it('must be valid', () => {
      return User.create({
        email: 'this@is.valid',
        password: '12345'
      })
        .then(() => expect(true).to.be.true)
        .then(() => User.create({
          email: 'thisisnotvalid',
          password: '12345'
        }))
        .then(() => expect(true).to.be.false)
        .catch(() => expect(true).to.be.true)
    });
    it('must be unique', () => {
      const joe = {
        email: 'joe@shmo.com',
        password: '12345'
      };
      const joseph = {
        email: 'joe@shmo.com',
        password: '9876'
      };

      return User.create(joe)
        .then(user => expect(user).to.be.ok)
        .then(() => User.create(joseph))
        .then(() => expect(true).to.be.false)
        .catch(() => expect(true).to.be.true)
    });
    it('must be a string', () => {
      return User.create({ email: 'jeff@shmo.com', password: '12345' })
        .then(user => expect(user).to.be.ok)
        .then(() => User.create({ email: 123, password: '1234' }))
        .then(() => expect(true).to.be.false)
        .catch(() => expect(true).to.be.true)
    });
  });

  describe('password field', () => {
    it('must be a string', () => {
      const joe = {
        email: 'joe@shmo.com',
        password: '12345'
      };
      return User.create(joe)
        .then(joe => expect(joe).to.be.ok)
        .then(() => User.create({ email: 'joe@shmo.com', password: 1234 }))
        .then(() => expect(true).to.be.false)
        .catch(() => expect(true).to.be.true);
    });
    it('cannot be null', () => {
      return User.create({ email: 'joe@shmo.com' })
        .then(() => expect(true).to.be.false)
        .catch(() => expect(true).to.be.true)
    });
    it('cannot be an empty string', () => {
      return User.create({ email: 'joe@shmo.com', password: '' })
        .then(() => expect(true).to.be.false)
        .catch(() => expect(true).to.be.true)
    });
  });
})