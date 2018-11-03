import axios from 'axios';

const tokenHeader = {
  headers: {
    authorization: window.localStorage.getItem('token')
  }
};

//action constants
const LOAD_LINE_ITEMS = 'LOAD_LINE_ITEMS';

//action creators
export const loadLineItems = lineItems => ({
  type: LOAD_LINE_ITEMS,
  lineItems
});

//thunk creators | underscore(_) denotes a thunk
export const _loadLineItems = (userId, cartId) => dispatch => (
  axios.get(`/api/lineItems/user/${userId}/cart/${cartId}`, tokenHeader)
    .then(response => response.data)
    .then(lineItems => dispatch(loadLineItems(lineItems)))
    .catch(err => { throw err; })
);

//reducer for the order slice of state
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_LINE_ITEMS:
      const orderedLineItems = action.lineItems.sort((a, b) => (
        new Date(a.createdAt) - new Date(b.createdAt)
      ))
      return orderedLineItems;
    default:
      return state;
  }
};