import axios from 'axios';

const initialState = {
  suggestions: [],
  term: ''
}

const SETSUGGESTIONS = 'SETSUGGESTIONS';

const setSuggestions = suggestions => {
  return {
    type: SETSUGGESTIONS,
    suggestions,
  }
}

export const _searchTerm = term => dispatch => {
  axios.get(`/api/search/${term}`)
    .then(res => res.data)
    .then(searchResults => dispatch(setSuggestions(searchResults)))
    .catch(err => console.log('something went wrong with _searchTerm thunk', err))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SETSUGGESTIONS:
      const { suggestions } = action;
      return { ...state, suggestions }
    default:
      return state;
  }
}