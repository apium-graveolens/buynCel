import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormGroup, TextField, Button, Typography, Grid, Checkbox} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {_loadLineItems} from '../store/lineItems'
import {_editUser} from '../store/auth'


class Checkout extends Component {
    constructor(){
        super()
        this.state = {
            address: {
                name: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                save: false
            },
            payment: {
                name: '',
                number: '',
                expDate: '',
                cvc: '',
                zip: '',
                save: false
            }
        }

        this.changeAddressInputs = this.changeAddressInputs.bind(this)
        this.condenseAddress = this.condenseAddress.bind(this)
        this.checkout = this.checkout.bind(this)
    }

    componentDidMount(){
        this.initCart();
    }

    initCart(){
        const { auth, order, loadCartLineItems } = this.props;
        //if both user and order have been loaded
        if (order) loadCartLineItems(auth.id, order.id);
    }

    changeAddressInputs(e){
        let value = e.target.value
        if(e.target.name === 'save') {
            value = !this.state.address.save
        }

        const address = {...this.state.address}
        address[e.target.name] = value

        this.setState({ address })
    }

    changePaymentInputs(e){
        const _payment = {...this.state.payment}
        _payment[e.target.name] = e.target.value
        
        this.setState({
            payment: _payment
        })
    }

    //---CHECKOUT FUNCITONS---

    checkout(){
        if(this.state.address.save){
            this.saveAddress()
        }

        console.log(this.props.auth);
    }


    saveAddress(){
        const userId = this.props.auth.id
        const savedAddress = this.condenseAddress()
        this.props.editUser(userId, {savedAddress})
    }


    //---HELPER FUNCTIONS---
    calculateTotal = lineItems => {
        if (lineItems.length > 0) {
            return lineItems.reduce((total, curr) => (
            total + (curr.product.price * curr.quantity)
            ), 0);
        } else {
            return 0;
        }
    };

    formatTotal = total => '$' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    condenseAddress = () => {
        const array = Object.keys(this.state.address).map(line => this.state.address[line]);
        array.pop();
        return array.join('|')
    }

    expandAddress = (address) => {
        const array = address.split('|')
        const keys = Object.keys(this.state.address)
        return array.reduce( (object, line, index) => {
            object[keys[index]] = line
            return object
        },{})
    }

    //---END HELPER FUNCTIONS---

    render(){
        const {address, payment} = this.state;
        const {lineItems} = this.props;
        const totalAmount = this.formatTotal(this.calculateTotal(lineItems));
        const totalCount = lineItems.length

        return (
            <div>
            
            <h1>Checkout</h1>

            <Grid container direction={'row'}>
            
                <Grid item xs={4} container direction={'column'} alignItems={'center'}>

                    <Grid item xs={6}>
                        <Typography variant={'subtitle1'}>  1. Review Order Summary </Typography>
                        <hr/>
                    </Grid>

                    <Grid item xs={6} container direction={'column'} alignItems={'center'}>
                        <Typography>
                            Amount: {totalAmount}
                        </Typography>
                        <Typography>
                            Products: {totalCount}
                        </Typography>
                        <hr/>
                        <Button
                            to={'/cart'}
                            component={Link}
                        >
                            View Cart
                        </Button>

                    </Grid>

                </Grid>

                <Grid item xs={4} container direction={'column'} alignItems={'center'}>

                    <Grid item xs={6}>
                        <Typography variant={'subtitle1'}>  2. Shipping Information </Typography>
                        <hr/>
                    </Grid>

                    <Grid item xs={6} container direction={'row'} justify={'center'} alignItems={'center'}>
                        <TextField label={'Recipient Name'} name={'name'} value={address.name} onChange={this.changeAddressInputs}/>
                        <TextField label={'Address'} name={'address'} value={address.address} onChange={this.changeAddressInputs}/>
                        <TextField label={'City'} name={'city'} value={address.city} onChange={this.changeAddressInputs}/>
                        <TextField label={'State'} name={'state'} value={address.state} onChange={this.changeAddressInputs}/>
                        <TextField label={'Zip Code'} name={'zip'} value={address.zip} onChange={this.changeAddressInputs}/>

                        <Typography>Save Address?</Typography><Checkbox name={'save'} checked={address.save} onChange={this.changeAddressInputs}/>
                    </Grid>


                </Grid>

                <Grid item xs={4} container direction={'column'} alignItems={'center'}>

                    <Grid item xs={6}>
                        <Typography variant={'subtitle1'}>  3. Payment Information </Typography>
                        <hr/>
                    </Grid>

                    <Grid item xs={6} container direction={'row'} justify={'center'} alignItems={'stretch'}>
                        <TextField label={'Cardholder Name'} />
                        <TextField label={'Credit Card Number'}/>
                        <TextField label={'Expiration Date'}/>
                        <TextField label={'CVC'}/>
                        <TextField label={'Zip Code'}/>
                    </Grid>

                    <Button
                        onClick={()=>{
                            this.checkout();
                        }}
                    
                    >Complete Order
                    </Button>

                </Grid>

            </Grid>


            </div>
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

const mapDispatchToProps = dispatch => ({
    loadCartLineItems: (userId, cartId) => dispatch(_loadLineItems(userId, cartId)),
    editUser: (userId, newUser) => dispatch(_editUser(userId,newUser))
});

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)