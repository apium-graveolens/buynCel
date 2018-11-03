import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import lineItems from './lineItems';
import products from './products';
import auth from './auth';
import orders from './orders';

//combine all slices of state
const reducer = combineReducers({
  lineItems,
  products,
  auth,
  orders
});

//export the created store, with thunk and logger middleware applied
export default createStore(reducer, applyMiddleware(thunk, logger))