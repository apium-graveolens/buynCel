import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reviews from './reviews';
import lineItems from './lineItems';
import products from './products';
import auth from './auth';
import orders from './orders';
import categories from './categories'
import search from './search'

//combine all slices of state
const reducer = combineReducers({
  reviews,
  lineItems,
  products,
  auth,
  orders,
  categories,
  search,
});

//export the created store, with thunk and logger middleware applied
export default createStore(reducer, applyMiddleware(thunk, logger))