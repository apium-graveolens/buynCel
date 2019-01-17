import React, { Component } from 'react';
import { withStyles, Grid, Button, Table, TableHead, TableCell, TableRow, TableBody, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { _createLineItem, _updateLineItem, _removeLineItem } from '../store/orders';
import { _loadLineItems } from '../store/lineItems';
import { calculateTotal, formatTotal } from '../util';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  total: {
    textAlign: 'end',
    paddingTop: 50,
  },
  button: {
    margin: 9,
    minWidth: 3,
    width: 3,
    padding: 8,
  },
  productImg: {
    width: 50
  },
});

class SignUp extends Component {
  componentDidMount() {
    this.initCart()
  }
  initCart = () => {
    const { auth, order, loadCartLineItems } = this.props;
    //if both user and order have been loaded
    console.log("ORDER", order)
    if (order) loadCartLineItems(auth.id, order.id);
  }
  handleClickUp = (direction, lineItem) => {
    const { create, update, remove, auth, order } = this.props;
    update(lineItem, direction, auth.id, order.id)
  }
  removeItem = item => {
    const { order, auth } = this.props;
    this.props.remove(item, auth.id, order.id);
  }
  render() {
    const { classes, lineItems } = this.props;
    console.log()
    return (
      <Grid container justify="center">
        <Grid item xs={9} lg={7}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell numeric>Quantity</TableCell>
                <TableCell numeric>Unit Price</TableCell>
                <TableCell numeric>Total Price</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="item">
                      <img
                        className={classes.productImg}
                        src={item.product.photo}
                      />
                    </TableCell>
                    <TableCell numeric>
                      <Button onClick={() => this.handleClickUp('+', item)} className={classes.button}>↑</Button>
                      {item.quantity}
                      <Button
                        disabled={item.quantity === 0}
                        onClick={() => this.handleClickUp('-', item)}
                        className={classes.button}
                      >↓</Button>
                    </TableCell>
                    <TableCell numeric>{item.product.price}</TableCell>
                    <TableCell numeric>{item.product.price * item.quantity}</TableCell>
                    <TableCell numeric>{item.protein}</TableCell>
                    <TableCell>
                      <Button onClick={() => this.removeItem(item)} color="secondary">
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Grid container justify="flex-end">
            <Grid item xs={3} className={classes.total}>
              <Typography variant="h6">
                Total: {formatTotal(calculateTotal(lineItems))}
              </Typography>
            </Grid>
          </Grid>
          <Button
            to={'/checkout'}
            component={Link}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ orders, auth, lineItems }) => {
  return {
    order: orders.find(order => order.status == 'cart'),
    auth,
    lineItems
  }
}

const mapDispatchToProps = (dispatch) => {
  // const lineItem = order ? order.lineItems.find(item => item.productId == product.id) : undefined;
  return {
    loadCartLineItems: (userId, cartId) => dispatch(_loadLineItems(userId, cartId)),
    update: (lineItem, direction, userId, cartId) => dispatch(_updateLineItem(lineItem, direction, userId, cartId)),
    remove: (lineItem, userId, orderId) => dispatch(_removeLineItem(lineItem, userId, orderId)),
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignUp));
