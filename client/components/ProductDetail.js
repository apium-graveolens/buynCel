import React from 'react';
import ReviewList from './ReviewList';
import { withStyles, Chip, Grid, Button, Typography, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import CategoryChip from './CategoryChip';
import { _createLineItem, _updateLineItem, _removeLineItem } from '../store/orders';

const styles = {
  img: {
    width: '100%'
  },
  reviewContainer: {
    height: '30vh'
  },
  numInput: {
    width: 35
  }
};

class ProductDetail extends React.Component {
  state = {
    quantity: 0
  }
  handleClick = () => {
    const { history, create, auth, product, orders } = this.props;
    const order = orders.find(order => order.status === 'cart');
    create(order.id, product.id, auth.user.id)
      .then(thing => {
        console.log(thing);
        history.push('/cart');
      });

    // history.push('/cart')
  }
  changeQuantity = e => {
    this.setState({ quantity: e.target.value })
  }
  render() {
    const { product, classes, auth } = this.props;
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
          <Typography variant="title">{title}</Typography>
          <hr />
          <Typography>{description}</Typography>
          <Typography>${price}</Typography>

          {categories && categories.map(category => (
            <CategoryChip key={category.id} category={category} />
          ))}

          <hr />

          {auth.user.id && (
            <div>
              <Button
                onClick={this.handleClick}
                variant="contained"
                color="primary"
              >Add To Cart</Button>
            </div>
          )}

        </Grid>
        <Grid justify="center" container className={classes.reviewContainer} item xs={12}>
          <Grid item xs={11} lg={8}>
            <ReviewList product={product} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
};

const mapStateToProps = ({ products, auth, orders }, { match }) => {
  const id = match.params.id * 1;
  return {
    product: products[0] ? products.find(product => product.id == id) : {},
    orders,
    auth,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    create: (orderId, productId, userId) => dispatch(_createLineItem(orderId, productId, userId))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));