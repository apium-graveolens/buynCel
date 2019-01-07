import axios from 'axios';
import { _loadLineItems } from './lineItems';

let tokenHeader = {
  headers: {
    authorization: window.localStorage.getItem('token')
  }
};

//action constants
const LOAD_ORDERS = 'LOAD_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

//action creators
//TODO: change this to be 'setOrders' to follow convention
export const loadOrders = orders => ({
  type: LOAD_ORDERS,
  orders
});
export const addOrder = order => ({
  type: ADD_ORDER,
  order
});
export const deleteOrder = id => ({
  type: DELETE_ORDER,
  id
})

//thunk creators | underscore(_) denotes a thunk
export const _createLineItem = (orderId, productId, userId) => dispatch => (
  axios.post(`/api/lineItems`, {
    productId,
    orderId,
    userId
  }, tokenHeader)
    .then(() => dispatch(_loadOrders(userId)))
    .catch(err => {
      throw err;
    })
);
export const _removeLineItem = (lineItem, userId, orderId) => dispatch => (
  axios.delete(`/api/lineItems/${lineItem.id}`, tokenHeader)
    .then(() => {
      dispatch(_loadOrders(userId))

      //TODO: This is hacky and needs a cleaning
      dispatch(_loadLineItems(userId, orderId));
    })
    .catch(err => {
      throw err;
    })
)
export const _updateLineItem = (lineItem, direction, userId, orderId) => dispatch => {
  const update = { quantity: lineItem.quantity };
  if (direction == '+') update.quantity++;
  else update.quantity--;
  axios.put(`api/lineItems/${lineItem.id}`, update, tokenHeader)
    .then(() => {
      dispatch(_loadOrders(userId));

      //TODO: This is hacky and needs a cleaning
      dispatch(_loadLineItems(userId, orderId));
    })
    .catch(err => {
      throw err;
    })
}
export const _placeOrder = id => dispatch => (
  axios.put(`/api/orders/${id}`, { status: 'ORDER' })
    .then(() => {
      dispatch(_loadOrders())
    })
);
export const _loadOrders = id => dispatch => {
  tokenHeader = {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
  return axios.get(`/api/orders/user/${id}`, tokenHeader)
    .then(response => response.data)
    .then(orders => dispatch(loadOrders(orders)))
    .catch(err => { console.log('here'); })
};
export const _addOrder = order => dispatch => (
  axios.post('/api/orders', order)
    .then(response => response.data)
    .then(order => dispatch(addOrder(order)))
    .catch(err => { throw err })
);

//Admin only 
export const _editOrder = (id, editedOrder) => dispatch => (
  axios.put(`/api/orders/${id}`, { ...editedOrder, status: 'ORDER' })

    //this is the simple version, where we just re-fetch all the orders after an update
    .then(() => dispatch(_loadOrders()))
    .catch(err => { throw err })
);
export const _deleteOrder = id => dispatch => (
  axios.delete(`/api/orders/${id}`)
    .then(() => dispatch(deleteOrder(id)))
    .catch(err => { throw err })
);

//reducer for the order slice of state
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...state, action.order];
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.id);
    default:
      return state;
  }
};