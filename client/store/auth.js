import axios from 'axios';

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
    .then(user => dispatch(setUser(user)))
    .catch(err => { throw err });
};
export const _login = credentials => dispatch => (
  //send login credentials to server
  axios.post('/api/auth', credentials)
    .then(response => response.data.token)
    .then(token => {
      //if proper credentials, make another call to trade the token for the corresponding user
      if (token) window.localStorage.setItem('token', token);
      //QUESTION: Why do I have to return dispatch for tests to pass?
      return dispatch(_exchangeTokenForAuth());
    })
    .catch(err => { throw err })
);

export const logout = () => {
  window.localStorage.clear();
  setUser({});
}

export default (state = {}, action) => {
  if (action.type === SET_USER) return action.user;
  else return state;
};