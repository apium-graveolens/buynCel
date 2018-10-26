import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import products from './products';

//combine all slices of state
const reducer = combineReducers({
  products
});

//export the created store, with thunk and logger middleware applied
export default createStore(reducer, applyMiddleware(thunk, logger))