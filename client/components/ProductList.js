import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSingle from './ProductSingle';
import { Grid, Typography } from '@material-ui/core';

class ProductList extends Component {
  render() {
    const { auth, order, search, products, match } = this.props;
    const { path, params } = match;
    const { category } = params;
    let isCategorySearch;

    //determine which products need to be loaded
    let productsToList = [];
    if (path === '/search') productsToList = search.suggestions;
    else if (path === '/products') productsToList = products;
    //else, on category search page
    else {
      productsToList = products.filter(product => {
        return product.categories.filter(cat => cat.name === category).length > 0;
      })
      isCategorySearch = true;
    }

    return (
      <div>
        <Grid container justify="center">
          {isCategorySearch && (
            <Typography>Category: {category}</Typography>
          )}
          <Grid container justify="center" item xs={12} md={9}>
            {productsToList.length > 0 ? productsToList.map(product => (
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
  orders = orders ? orders : []
  return {
    search,
    auth,
    products,
    order: orders.find(order => order.status == 'cart')
  }
};

export default connect(mapStateToProps)(ProductList);