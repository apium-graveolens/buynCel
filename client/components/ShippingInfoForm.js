import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, FormGroup, TextField, Grid, Checkbox } from '@material-ui/core'
import { _editOrder } from '../store/orders';

class ShippingInforForm extends Component {
  state = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    save: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    // this.props.editOrder(this.props.cart.id, this.state)
  }

  handleSubmit = () => {
    //TODO: update order with inputted shipping informationj
  }

  render() {
    const { name, address, city, state, zip, save } = this.state;
    return (
      <div>
        <TextField fullWidth label={'Recipient Name'} name={'name'} value={name} onChange={this.handleChange} />
        <TextField fullWidth label={'Address'} name={'address'} value={address} onChange={this.handleChange} />
        <TextField fullWidth label={'City'} name={'city'} value={city} onChange={this.handleChange} />
        <TextField fullWidth label={'State'} name={'state'} value={state} onChange={this.handleChange} />
        <TextField fullWidth label={'Zip Code'} name={'zip'} value={zip} onChange={this.handleChange} />
        {/* <Typography>Save Address?</Typography> <Checkbox name={'save'} checked={save} onChange={this.handleChange} /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ orders }) => {
  const cart = orders.find(order => order.status == 'cart')
  console.log('cart', cart)
  return {
    cart
  }
}

const mapDispatchToProps = dispatch => ({
  editOrder: order => dispatch(_editOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInforForm);