import axios from 'axios';

//action constants
const LOAD_CATEGORIES = "LOAD_CATEGORIES"


//action creators
const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    categories
})

//thunks
export const _loadCategories = () => dispatch => {
    axios.get('/api/categories')
        .then(response => response.data)
        .then(categories => dispatch(loadCategories(categories)))
        .catch(err => {throw err});
}

export default (state = [], action) => {
    switch(action.type){
        case LOAD_CATEGORIES:
            return action.categories;
        default:
            return state
    }
}
