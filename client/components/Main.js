import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { _loadProducts } from '../store/products';
import { Grid } from '@material-ui/core';
import ProductList from './ProductList';
import SignUp from './SignUp';
import ProductDetail from './ProductDetail';

class Main extends Component {
  componentDidMount() {
    this.props.init();
  }
  render = () => {
    return (
      <div>
        <Grid container justify="center">
          <Link to='/'>Home Link</Link>
          <Link to='/products'>Products Link</Link>
          <Link to='/sign-up'>Sign Up Link</Link>
          <h1>This will be a header</h1>
          <Route exact path='/products' component={ProductList} />
          <Route exact path='/products/:id' component={ProductDetail} />
          <Route exact path='/sign-up' component={SignUp} />
        </Grid>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(_loadProducts())
});

export default withRouter(connect(null, mapDispatchToProps)(Main));