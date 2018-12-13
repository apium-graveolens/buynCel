import axios from 'axios';


//---ACTION CONSTANTS---
const EDIT_USER = 'EDIT_USER'

//---ACTION CREATORS---
const loadUser = (user) => ({
    type: EDIT_USER,
    user
})

//---THUNK CREATORS---

const _loadUser = (userId) => dispatch => {
    axios.get(`/users/${userId}`)
        .then( response => response.data )
        .then( user => loadUser(user))
        .catch( err => { throw err })
}


const _editUser = (userId, newUser) => dispatch => {
    axios.put(`/api/users/${userId}`, newUser)
        .then( () => { dispatch(_loadUser()) } )
        .catch( err => { throw err })
}
