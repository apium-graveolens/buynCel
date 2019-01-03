import axios from 'axios';
import { _loadOrders } from './orders';
import { stat } from 'fs';

const defaultState = {
  user: {},
  error: false
};

//action constants
const SET_USER = 'SET_USER';
const SET_ERROR = 'SET_ERROR';

//action creators
export const setUser = user => ({
  type: SET_USER,
  user
});
export const setError = error => ({
  type: SET_ERROR,
  error
});

//thunk creators
export const _exchangeTokenForAuth = () => dispatch => {
  //check to see if user has already logged in
  const token = window.localStorage.getItem('token');
  if (!token) {
    return;
  }

  // else, send token to server to get back corresponding user
  console.log("EXCHANGING")
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
    .catch(err => {
      console.log(err.status)
      alert('Bad credentials');
      dispatch(_setError(err))
    })
);

export const _editUser = (userId, newUser) => dispatch => {
  axios.put(`/api/users/${userId}`, newUser)
    .then(response => response.data)
    .then(user => { dispatch(setUser(user)) })
    .catch(err => { throw err })
}

export const logout = () => dispatch => {
  window.localStorage.clear();
  dispatch(setUser({}));
}

export const _createUser = (user, history) => dispatch => {
  //make new user post call to API
  return axios.post('/api/users', user)
    .then(res => res.data)
    .then(user => {
      //using full user object here rather than just email and pass credentials. not very semantic.
      dispatch(_login(user, history))
    })
    .catch(err => {
      alert('Invalid email address. Please try again.');
    })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.error }
    case SET_USER:
      return { error: false, user: action.user };
    default:
      return state;
  }
};