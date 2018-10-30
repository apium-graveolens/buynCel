import { expect } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import reducer, {
  _loadProducts,
  _addProduct,
  _editProduct,
  _deleteProduct,
  loadProducts,
  addProduct,
  deleteProduct
} from '../client/store/products';

const products = [
  { id: 1, title: 'Sandals', description: 'Casual, beach foot-wear', price: '19.99' },
  { id: 2, title: 'Soccer Ball', description: 'Size 5 FIFA standard', price: '24.99' },
  { id: 3, title: 'Celery', description: 'Fresh, green, negative calories', price: '1.99' },
];
let state;
let action;

describe('Product slice', () => {
  describe('reducer', () => {
    it('can handle LOAD_PRODUCTS', () => {
      action = {
        type: 'LOAD_PRODUCTS',
        products
      };
      state = reducer(undefined, action);
      expect(state).to.eql(products);
    });
    it('can handle ADD_PRODUCT', () => {
      const newProduct = {
        title: 'Celery',
        description: 'Fresh, green, negative calories',
        price: '1.99'
      }
      action = {
        type: 'ADD_PRODUCT',
        product: newProduct
      }
      state = reducer(undefined, action);
      expect(state).to.eql([newProduct]);
    });
    it('can handle DELETE_PRODUCT', () => {
      action = {
        type: 'DELETE_PRODUCT',
        id: 1
      }
      state = reducer(products, action);
      expect(state).to.eql(products.filter(product => product.id !== 1));
    });
    it('returns original state as the default option', () => {
      state = reducer(products, {});
      expect(state).to.eql(products);
    });
  });
  describe('action creators', () => {
    it('loadProjects', () => {
      action = loadProducts(products);
      expect(action.type).to.equal('LOAD_PRODUCTS');
      expect(action.products).to.eql(products)
    });
    it('addProject', () => {
      action = addProduct(products[0]);
      expect(action.type).to.equal('ADD_PRODUCT');
      expect(action.product).to.eql(products[0])
    });
    it('deleteProject', () => {
      action = deleteProduct(2);
      expect(action.type).to.equal('DELETE_PRODUCT');
      expect(action.id).to.eql(2)
    });
  });
  describe('async thunks', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let mock;

    beforeEach(() => {
      mock = new MockAdapter(axios);
    })
    afterEach(() => {
      mock.reset();
    });

    it('_loadProducts dispatches the LOAD_PRODUCTS action when the request is complete', () => {
      mock.onGet('/api/products').reply(200, products);
      const store = mockStore([]);
      const expectedActions = [loadProducts(products)]

      return store.dispatch(_loadProducts())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
    it('_addProduct dispatches the ADD_PRODUCT action when the request is complete', () => {
      mock.onPost('/api/products').reply(201, products[0]);
      const store = mockStore([]);
      const expectedActions = [addProduct(products[0])]

      return store.dispatch(_addProduct(products[0]))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
    it('_editProduct dispatches the LOAD_PRODUCTS action when the request is complete', () => {
      mock.onPut('/api/products/1').reply(201, products[0]);
      mock.onGet('/api/products').reply(200, products)
      const store = mockStore([]);
      const expectedActions = [loadProducts(products)]

      return store.dispatch(_editProduct(1, { price: '100' }))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
    it('_deleteProduct dispatches the DELETE_PRODUCT action when the request is complete', () => {
      mock.onDelete('/api/products/1').reply(202);
      const store = mockStore([]);
      const expectedActions = [deleteProduct(1)]

      return store.dispatch(_deleteProduct(1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
        })
        .catch(err => console.log(err))
    });
  })
});