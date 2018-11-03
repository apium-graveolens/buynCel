import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { _loadProducts } from '../store/products';
import NavBar from './NavBar';
import Home from './Home';
import ProductList from './ProductList';
import SignUp from './SignUp';
import ProductDetail from './ProductDetail';
import Login from './Login';
import Cart from './Cart';
import { _exchangeTokenForAuth } from '../store/auth';

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
          <Route exact path='/login' component={Login} />
          <Route exact path='/cart' component={Cart} />
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(_loadProducts())
    dispatch(_exchangeTokenForAuth())
  }
});

export default withRouter(connect(null, mapDispatchToProps)(Main));