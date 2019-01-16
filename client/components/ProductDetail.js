import React from 'react';
import ReviewList from './ReviewList';
import { withStyles, Chip, Grid, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  img: {
    width: '100%'
  },
  reviewContainer: {
    height: '30vh'
  },
};

const ProductDetail = ({ product, classes }) => {
  const { title, description, price, photo, categories } = product;
  return (
    //TODO: add spacing/padding to grid items
    <Grid spacing={40} container justify="center">
      <Grid item xs={10} sm={5} md={4} lg={3}>
        <img
          className={classes.img}
          src={photo}
        />
      </Grid>
      <Grid item xs={10} sm={5} md={4} lg={3}>
        <h3>{title}</h3>
        <hr />
        <p>{description}</p>
        <p>${price}</p>

        {categories && categories.map(category => (
          <Chip key={category.id} label={category.name} />
        ))}

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
      <Grid justify="center" container className={classes.reviewContainer} item xs={12}>
        <Grid item xs={11} lg={8}>
          <ReviewList product={product} />
        </Grid>
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

export default withStyles(styles)(connect(mapStateToProps)(ProductDetail));