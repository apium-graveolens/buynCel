import axios from 'axios';

//action constants
const LOAD_ORDERS = 'LOAD_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

//action creators
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
export const _loadOrders = () => dispatch => (
  axios.get('/api/orders')
    .then(response => response.data)
    .then(orders => dispatch(loadOrders(orders)))
    .catch(err => { throw err })
);
export const _addOrder = order => dispatch => (
  axios.post('/api/orders', order)
    .then(response => response.data)
    .then(order => dispatch(addOrder(order)))
    .catch(err => { throw err })
);

//Admin only 
export const _editOrder = (id, editedOrder) => dispatch => (
  axios.put(`/api/orders/${id}`, editedOrder)

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