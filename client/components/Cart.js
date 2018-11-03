import React, { Component } from 'react';
import { withStyles, Grid, Button, Table, TableHead, TableCell, TableRow, TableBody, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { _createLineItem, _updateLineItem, _removeLineItem } from '../store/orders';
import { _loadLineItems } from '../store/lineItems';

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
});

class SignUp extends Component {
  componentDidMount() {
    this.initCart()
  }
  initCart = () => {
    const { auth, order, loadCartLineItems } = this.props;
    //if both user and order have been loaded
    if (order) loadCartLineItems(auth.id, order.id);
  }
  handleClickUp = (direction, lineItem) => {
    const { create, update, remove, auth, order } = this.props;
    update(lineItem, direction, auth.id, order.id)
  }
  calculateTotal = lineItems => {
    if (lineItems.length > 0) {
      return lineItems.reduce((total, curr) => (
        total + (curr.product.price * curr.quantity)
      ), 0);
    } else {
      return 0;
    }
  }
  formatTotal = total => '$' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  render() {
    const { classes, lineItems } = this.props;
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
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="item">
                      {item.product.title}
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Grid container justify="flex-end">
            <Grid item xs={3} className={classes.total}>
              <Typography variant="h6">
                Total: {this.formatTotal(this.calculateTotal(lineItems))}
              </Typography>
            </Grid>
          </Grid>
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
    // remove: () => dispatch(_removeLineItem(lineItem, user.id)),
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignUp));
