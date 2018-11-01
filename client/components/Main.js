import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { _loadProducts } from '../store/products';
import { Grid } from '@material-ui/core';
import NavBar from './NavBar';
import Home from './Home';
import ProductList from './ProductList';
import SignUp from './SignUp';
import ProductDetail from './ProductDetail';

class Main extends Component {
  componentDidMount() {
    this.props.init();
  }
  render = () => {
    const styles = {
      marginTop: '10vh'
    }
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Home} />
        <div style={styles}>
          <Route exact path='/products' component={ProductList} />
          <Route exact path='/products/:id' component={ProductDetail} />
          <Route exact path='/sign-up' component={SignUp} />
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(_loadProducts())
});

export default withRouter(connect(null, mapDispatchToProps)(Main));