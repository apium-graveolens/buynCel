import React from 'react';
import ReviewList from './ReviewList';
import { Grid, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const ProductDetail = ({ product }) => {
  const { title, description, price, photo } = product;
  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={3}>
        <img src={photo} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <h3>{title}</h3>
        <hr />
        <p>{description}</p>
        <p>${price}</p>
        <hr />
        <h4>Add to cart</h4>
        
        <div>
          <Button value="plus" size="small" color="primary">
                +
          </Button>
          <Typography>
            0
          </Typography>
          <Button
            value="minus" size="small"
            color="primary"
          >
            -
          </Button>
        </div>
        
      </Grid>
      <Grid item xs={9}>
        <ReviewList product={product} />
      </Grid>
    </Grid>
  )
};

const mapStateToProps = ({ products }, { match }) => {
  const id = match.params.id * 1;
  return {
    product: products[0] ? products.find(product => product.id == id) : {}
  }
}

export default connect(mapStateToProps)(ProductDetail);