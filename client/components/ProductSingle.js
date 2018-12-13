import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { _createLineItem, _updateLineItem, _removeLineItem } from '../store/orders';
import { Chip, Card, CardContent, CardActions, CardActionArea, CardMedia, Typography, Button, withStyles, Grid } from '@material-ui/core';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },

};

class ProductSingle extends Component {
  handleClick = e => {
    const direction = e.target.innerHTML;
    const { lineItem, create, update, remove } = this.props;
    if (!lineItem) {
      create();
    }
    else if (lineItem.quantity == 1 && direction == '-') remove();
    else update(lineItem, direction);
  }
  render() {
    const { lineItem, classes, product } = this.props;
    const quantity = lineItem ? lineItem.quantity : 0;
    return (
      <Grid item xs={12} lg={3}>
        <Card className={classes.card}>
          <CardActionArea to={`/products/${product.id}`} component={Link}>
            <CardMedia
              className={classes.media}
              image={product.photo}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography>
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          {product.categories.map(category => (
            <Chip key={category.name} label={category.name} />
          ))}
          <CardActions>
            <Button onClick={this.handleClick} value="plus" size="small" color="primary">
              +
          </Button>
            <Typography>
              {quantity}
            </Typography>
            <Button
              disabled={quantity == 0}
              onClick={this.handleClick}
              value="minus" size="small"
              color="primary"
            >
              -
          </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch, { order, product, user }) => {
  const lineItem = order ? order.lineItems.find(item => item.productId == product.id) : undefined;
  return {
    lineItem,
    create: () => dispatch(_createLineItem(order.id, product.id, user.id)),
    update: (lineItem, direction) => dispatch(_updateLineItem(lineItem, direction, user.id, order.id)),
    remove: () => dispatch(_removeLineItem(lineItem, user.id))
  }
}


export default withStyles(styles)(connect(null, mapDispatchToProps)(ProductSingle));