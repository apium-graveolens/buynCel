import axios from 'axios';

//action constants
const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
const ADD_PROUDCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

//action creators
export const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
});
export const addProduct = product => ({
  type: ADD_PROUDCT,
  product
});
export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  id
})

//thunk creators | underscore(_) denotes a thunk
export const _loadProducts = (categoryFilter,titleFilter) => dispatch => (
  axios.get('/api/products')
    .then(response => response.data)
    .then(products => {
      let _products = products
      if(categoryFilter){
        _products = products.filter( prod => {
          return prod.categories.some( category => {
            return categoryFilter.includes(category.id)
          })
        })
      }
      if(titleFilter) {
        _products = products.filter( prod => 
          prod.title.toLowerCase().includes(titleFilter.toLowerCase())
        )
      }
      dispatch(loadProducts(_products))
    })
    .catch(err => { throw err })
);

export const _addProduct = product => dispatch => (
  axios.post('/api/products', product)
    .then(response => response.data)
    .then(product => dispatch(addProduct(product)))
    .catch(err => { throw err })
);

//Admin only 
export const _editProduct = (id, editedProduct) => dispatch => (
  axios.put(`/api/products/${id}`, editedProduct)

    //this is the simple version, where we just re-fetch all the products after an update
    .then(() => dispatch(_loadProducts()))
    .catch(err => { throw err })
);
export const _deleteProduct = id => dispatch => (
  axios.delete(`/api/products/${id}`)
    .then(() => dispatch(deleteProduct(id)))
    .catch(err => { throw err })
)

//reducer for the product slice of state
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case ADD_PROUDCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.id);
    default:
      return state;
  }
};