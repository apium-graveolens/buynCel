import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSingle from './ProductSingle';
import { Grid, Typography } from '@material-ui/core';

class ProductList extends Component {
  render() {
    const { auth, order, search, products } = this.props;

    //check if page is product list or search list
    const isOnSearchPage = this.props.match.path === '/search';
    const searchOrAllProducts = isOnSearchPage ? search.suggestions : products;
    return (
      <div>
        <Grid container justify="center">
          <Grid container justify="center" item xs={12} md={9}>
            {searchOrAllProducts.length > 0 ? searchOrAllProducts.map(product => (
              <ProductSingle
                key={product.id}
                product={product}
                order={order}
                user={auth.user}
              />
            ))
              :
              <Typography>Sorry, no results found.</Typography>}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, products, orders, search }) => {
  return {
    search,
    auth,
    products,
    order: orders.find(order => order.status == 'cart')
  }
};

export default connect(mapStateToProps)(ProductList);