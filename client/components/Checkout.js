import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import ShippingInforForm from './ShippingInfoForm';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import { formatTotal, calculateTotal } from '../util';
import { _editOrder } from '../store/orders';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  stepper: {
    backgroundColor: 'none',
  },
  btnContainer: {
    marginTop: 40,
  }
});

function getSteps() {
  return ['Review order', 'Shipping Information', 'Payment Information'];
}

class Checkout extends React.Component {
  state = {
    shippingInfo: {
      name: null,
      address: null,
      addressCity: null,
      addressState: null,
      addressZip: null,
      save: false,
    },
    loading: false,
    activeStep: 0,
  }
  componentDidMount() {
    //if currently logged in user has saved shipping information, set state to that information
    const { auth } = this.props;
    if (auth.user.id) {
      const { name, addressCity, addressState, addressZip, address } = auth.user;
      this.setState({
        shippingInfo: {
          name,
          addressCity,
          addressState,
          addressZip,
          address

        }
      })
    }
  }
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleShippingInfoChange = e => {
    this.setState({
      shippingInfo: {
        //TODO: might be a 'better' way to do this
        ...this.state.shippingInfo,
        [e.target.name]: e.target.value
      }
    })

    console.log('shippingInfoState:', this.state)
    // this.props.editOrder(this.props.cart.id, this.state)
  }
  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handlePaymentSubmit = async e => {
    this.setState({ loading: true })
    const { editOrder, order, auth } = this.props;
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    const total = calculateTotal(this.props.lineItems);
    axios.post('/api/stripe', {
      token: token.id,
      amount: total,
    })
      .then(res => res.data)
      .then(({ status }) => {
        if (status === 'succeeded') {
          this.setState({ loading: false })
          //update order
          console.log('shippingInfo: ', this.state.shippingInfo)
          console.log('order.id: ', order.id)
          console.log('user.id', auth.user.id);
          editOrder(order.id, this.state.shippingInfo, auth.user.id);
          //send confirmation email
          alert('send confirmation email')
          //redirect to confirmation page
          this.props.history.push('/confirmation')
        } else {
          this.setState({ loading: false })
          alert('stripe failed. check console')
          console.log('status', status)
        }
      })
      .catch(err => {
        this.setState({ loading: false })
        //TODO: better error handling
        alert('There was an error with your card number. Please try again.')
        throw err;
      })
  }

  getStepContent = step => {
    const { lineItems } = this.props;
    switch (step) {
      case 0:
        return (
          <div>
            <Typography>
              Total: {formatTotal(calculateTotal(lineItems))}
            </Typography>
            <Typography>
              {/* Products: {totalCount} */}
              Products: {lineItems.length}
            </Typography>
          </div>
        );
      case 1:
        return <ShippingInforForm
          shippingInfo={this.state.shippingInfo}
          handleShippingInfoChange={this.handleShippingInfoChange}
        />;
      case 2:
        return <CardElement />;
      default:
        return 'Unknown step';
    }
  }
  render() {
    const { lineItems } = this.props;
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Grid container justify="center">
        <Grid item xs={12} md={5}>
          <div className={classes.root}>
            <Stepper id="stepper" activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{this.getStepContent(index)}</Typography>
                      <div className={classes.actionsContainer}>
                        <div className={classes.btnContainer}>
                          {activeStep === 0 ? (
                            <Button
                              to={'/cart'}
                              component={Link}
                              className={classes.button}
                            >
                              ← Cart
                        </Button>
                          ) : (
                              <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}
                              >
                                Back
                      </Button>
                            )}

                          {activeStep === 2 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handlePaymentSubmit}
                              className={classes.button}
                            >
                              {this.state.loading ? (
                                <ClipLoader
                                  className={override}
                                  sizeUnit={"px"}
                                  size={13}
                                  color={'#ffffff'}
                                  loading={this.state.loading}
                                />
                              ) : (
                                  'Finish'
                                )}
                            </Button>
                          ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                                className={classes.button}
                              >
                                Next
                          </Button>
                            )}
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                );
              })}
            </Stepper>
            {
              activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
            </Button>
                </Paper>
              )
            }
          </div >
        </Grid>
      </Grid>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = ({ orders, auth, lineItems }) => {
  return {
    order: orders.find(order => order.status == 'cart'),
    auth,
    lineItems
  }
}
const mapDispatchToProps = dispatch => ({
  loadCartLineItems: (userId, cartId) => dispatch(_loadLineItems(userId, cartId)),
  editUser: (userId, newUser) => dispatch(_editUser(userId, newUser)),
  editOrder: (orderId, editedOrder, userId) => dispatch(_editOrder(orderId, editedOrder, userId)),
});

export default withRouter(injectStripe(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout))));