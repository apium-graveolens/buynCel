import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ProductList from './ProductList';
import SignUp from './SignUp';

class Main extends Component {
  render = () => {
    return (
      <div>
        <Link to='/'>Home Link</Link>
        <Link to='/products'>Products Link</Link>
        <Link to='/sign-up'>Sign Up Link</Link>
        <h1>This will be a header</h1>
        <Route exact path='/products' component={ProductList} />
        <Route exact path='/sign-up' component={SignUp} />
      </div>
    )
  }
}

export default Main;