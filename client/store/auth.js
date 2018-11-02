import axios from 'axios';
import { _loadOrders } from './orders';

//action constants
const SET_USER = 'SET_USER';

//action creators
export const setUser = user => ({
  type: SET_USER,
  user
});

//thunk creators
export const _exchangeTokenForAuth = () => dispatch => {
  //check to see if user has already logged in
  const token = window.localStorage.getItem('token');
  if (!token) {
    return;
  }

  // else, send token to server to get back corresponding user
  console.log()
  return axios.get('/api/auth', {
    headers: {
      authorization: token
    }
  })
    //then set user as logged in
    .then(response => response.data)
    .then(response => {
      return response;
    })
    .then(user => {
      dispatch(setUser(user))
      dispatch(_loadOrders(user.id))
    })
    .catch(err => { throw err });
};
export const _login = (credentials, history) => dispatch => (
  //send login credentials to server
  axios.post('/api/auth', credentials)
    .then(response => response.data.token)
    .then(token => {
      //if proper credentials, make another call to trade the token for the corresponding user
      if (token) window.localStorage.setItem('token', token);
      //QUESTION: Why do I have to return dispatch for tests to pass?
      dispatch(_exchangeTokenForAuth());
      history.push('/products')
    })
    .catch(err => { throw err })
);

export const logout = () => dispatch => {
  window.localStorage.clear();
  dispatch(setUser({}));
}

export default (state = {}, action) => {
  if (action.type === SET_USER) return action.user;
  else return state;
};