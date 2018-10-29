import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ProductList from './ProductList';

class Main extends Component {
  render = () => {
    return (
      <div>
        <Link to='/'>Home Link</Link>
        <Link to='/products'>Products Link</Link>
        <h1>This will be a header</h1>
        <Route exact path='/products' component={ProductList} />
      </div>
    )
  }
}

export default Main;