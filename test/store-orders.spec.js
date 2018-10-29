import { expect } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import reducer, {
  _loadOrders,
  _addOrder,
  _editOrder,
  _deleteOrder,
  loadOrders,
  addOrder,
  deleteOrder
} from '../client/store/orders';


const orders = [
  { id: 1, status: 'CART' },
  { id: 2, status: 'CART' },
  { id: 3, status: 'ORDER' }
];
let state;
let action;

describe('Orders slice', () => {
  describe('action creators', () => {
    it('loadOrders', () => {
      action = loadOrders(orders);
      expect(action.type).to.eql('LOAD_ORDERS');
      expect(action.orders).to.eql(orders);
    });
    it('addOrder', () => {
      action = addOrder(orders[0]);
      expect(action.type).to.eql('ADD_ORDER');
      expect(action.order).to.eql(orders[0]);
    });
    it('deleteOrder', () => {
      action = deleteOrder(orders[0].id);
      expect(action.type).to.eql('DELETE_ORDER');
      expect(action.id).to.eql(orders[0].id);
    });
  });
  describe('reducer', () => {
    it('can handle LOAD_ORDERS', () => {
      action = loadOrders(orders)
      state = reducer(undefined, action);
      expect(state).to.eql(orders);
    });
    it('can handle ADD_ORDER', () => {
      const newOrder = { status: 'CART' };
      action = addOrder(newOrder)
      state = reducer(undefined, action);
      expect(state).to.eql([newOrder]);
    });
    it('can handle DELETE_ORDER', () => {
      action = deleteOrder(1)
      state = reducer(orders, action);
      expect(state).to.eql(orders.filter(order => order.id !== 1));
    });
    it('returns original state as the default option', () => {
      state = reducer(orders, {});
      expect(state).to.eql(orders);
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
    });

    it('_loadOrders dispatches the LOAD_ORDERS action when the request is complete', () => {
      mock.onGet('/api/orders').reply(200, orders);
      const store = mockStore([]);
      const expectedActions = [loadOrders(orders)]

      return store.dispatch(_loadOrders())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
    it('_addOrder dispatches the ADD_ORDER action when the request is complete', () => {
      mock.onPost('/api/orders').reply(201, orders[0]);
      const store = mockStore([]);
      const expectedActions = [addOrder(orders[0])]

      return store.dispatch(_addOrder(orders[0]))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
    it('_editOrder dispatches the LOAD_ORDERSS action when the request is complete', () => {
      mock.onPut('/api/orders/1').reply(201, orders[0]);
      mock.onGet('/api/orders').reply(200, orders)
      const store = mockStore([]);
      const expectedActions = [loadOrders(orders)]

      return store.dispatch(_editOrder(1, { price: '100' }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
    it('_deleteOrder dispatches the DELETE_ORDER action when the request is complete', () => {
      mock.onDelete('/api/orders/1').reply(202);
      const store = mockStore([]);
      const expectedActions = [deleteOrder(1)]

      return store.dispatch(_deleteOrder(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
  })
});