import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSingle from './ProductSingle';
import { Grid } from '@material-ui/core';

class ProductList extends Component {
  render() {
    return (
      <Grid container justify="center">
        {this.props.products.map(product => (
          <ProductSingle key={product.id} product={product} />
        ))}
      </Grid>
    )
  }
}

const mapStateToProps = ({ products }) => {
  return { products }
}

export default connect(mapStateToProps)(ProductList);