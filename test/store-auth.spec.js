global.window = {};
import 'mock-local-storage';
window.localStorage = global.localStorage;

import { expect } from 'chai';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import reducer, {
  setUser,
  _login,
  _exchangeTokenForAuth
} from '../client/store/auth';

const credentials = { name: 'joe@shmo.com', password: 'mushroom' };
const user = {
  id: 1,
  password: 'mushroom',
  name: 'joe@shmo.com'
};

describe('Auth slice', () => {
  let action;
  let state;

  describe('action creators', () => {
    it('setUser', () => {
      action = setUser(user);
      expect(action.type).to.eql('SET_USER');
      expect(action.user).to.eql(user);
    });
  });
  describe('reducer', () => {
    it('can handle SET_USER action', () => {
      action = setUser(user);
      state = reducer(undefined, action);
      expect(state).to.eql(user);
    });
    it('returns current state as default', () => {
      state = reducer(user, {});
      expect(state).to.eql(user);
    });
  });
  describe('async thunks', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let mock;

    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
      mock.reset();
      global.window.localStorage.clear();
    });

    it('_login dispatches the SET_USER action with the received user after the API request is fulfilled', () => {
      mock.onPost('/api/auth').reply(200, { token: 'sweetJWTToken' });
      mock.onGet('/api/auth').reply(200, user);
      const store = mockStore({});
      const expectedActions = [setUser(user)];
      return store.dispatch(_login(credentials))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(err => {
          throw err;
        });
    });
    it('_login sets the returned auth token to local storage', () => {
      const token = 'sjh124d93n9djsd30dsfj';
      mock.onPost('/api/auth').reply(200, { token });
      mock.onGet('/api/auth').reply(200, user);
      const store = mockStore({});
      return store.dispatch(_login(credentials))
        .then(() => {
          expect(global.window.localStorage.getItem('token')).to.eql(token)
        })
        .catch(err => { throw err });
    });
    it('_exchangeTokenForAuth dispatches the SET_USER action only if a token is found in local storage', () => {
      mock.onPost('/api/auth').reply(200, { token: 'sweetJWTToken' });
      mock.onGet('/api/auth').reply(200, user);
      const store = mockStore({});

      //TODO: need to figure out a better way to test this
      store.dispatch(_exchangeTokenForAuth())
      expect(store.getState()).to.eql({});
      return store.dispatch(_login(credentials))
        .then(() => {
          const expectedActions = [setUser(user)];
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(err => {
          throw err;
        });
    });
  });
});