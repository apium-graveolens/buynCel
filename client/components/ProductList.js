import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSingle from './ProductSingle';
import SearchBar from './SearchBar'
import { Grid } from '@material-ui/core';

class ProductList extends Component {
  render() {
    const { auth, order } = this.props;
    return (
      <div>
        <div>
          <SearchBar/> 
        </div>
        <Grid container justify="center">
          {this.props.products.map(product => (
            <ProductSingle
              key={product.id}
              product={product}
              order={order}
              user={auth}
            />
          ))}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, products, orders }) => {
  return {
    auth,
    products,
    order: orders.find(order => order.status == 'cart')
  }
};

export default connect(mapStateToProps)(ProductList);