import axios from 'axios';

const tokenHeader = {
  headers: {
    authorization: window.localStorage.getItem('token')
  }
};

//action constants
const FETCH_REVIEWS = 'FETCH_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';

//action creators
export const fetchReviews = reviews => ({
  type: FETCH_REVIEWS,
  reviews
});

//thunk creators
export const _fetchReviews = productId => dispatch => {
  return axios.get(`/api/reviews/product/${productId}`)
    .then(response => response.data)
    .then(reviews => dispatch(fetchReviews(reviews)))
    .catch(err => { throw err })
};
export const _createReview = review => dispatch => {
  return axios.post('/api/reviews', review, tokenHeader)
    .then(response => response.data)
    .then(() => dispatch(_fetchReviews(review.productId)))
    .catch(err => { throw err });
}

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return action.reviews.sort((a, b) => (
        new Date(b.createdAt) - new Date(a.createdAt)
      ));
    default:
      return state;
  }
};