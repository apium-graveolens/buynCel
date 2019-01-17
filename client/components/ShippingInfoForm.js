import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, FormGroup, TextField, Grid, Checkbox } from '@material-ui/core'
import { _editOrder } from '../store/orders';

class ShippingInforForm extends Component {
  render() {
    const { shippingInfo, handleShippingInfoChange } = this.props;
    const { name, address, addressCity, addressState, addressZip, save } = shippingInfo;
    return (
      <div>
        <TextField fullWidth label={'Recipient Name'} name={'name'} value={name} onChange={handleShippingInfoChange} />
        <TextField fullWidth label={'Address'} name={'address'} value={address} onChange={handleShippingInfoChange} />
        <TextField fullWidth label={'City'} name={'addressCity'} value={addressCity} onChange={handleShippingInfoChange} />
        <TextField fullWidth label={'State'} name={'addressState'} value={addressState} onChange={handleShippingInfoChange} />
        <TextField fullWidth label={'Zip Code'} name={'addressZip'} value={addressZip} onChange={handleShippingInfoChange} />
        {/* <Typography>Save Address?</Typography> <Checkbox name={'save'} checked={save} onChange={handleShippingInfoChange} /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ orders, auth }) => {
  const cart = orders.find(order => order.status == 'cart')
  return {
    cart,
    auth
  }
}

const mapDispatchToProps = dispatch => ({
  editOrder: order => dispatch(_editOrder(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingInforForm);