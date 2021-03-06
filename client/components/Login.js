import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import { connect } from 'react-redux';
import { _login } from '../store/auth';
import ErrorSnackBar from './ErrorSnackBar';

const styles = {
  viewContainer: {
    height: '100vh'
  },
  formContainer: {
    marginTop: '-240px',
    width: '100%',
  },
  button: {
    marginTop: 30,
    marginBottom: 30
  },
  accountBox: {
    fontSize: 150,
    textAlign: 'center',
  },
  signUp: {
    textAlign: 'center'
  }
}

class Login extends Component {
  state = {
    email: '',
    password: '',
    snackBar: true
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state);
  }
  handleSnackBarClose = () => {
    console.log('CLOSING')
    this.setState({ snackBar: false })
  }

  render() {
    const { classes } = this.props;
    const error = this.props.auth.error && this.state.snackBar;
    return (
      <Grid className={classes.viewContainer} container justify="center" alignItems="center">
        <Grid container justify="center" alignItems="center" item xs={6} md={4} lg={2} xlg={2}>
          <div className={classes.formContainer}>
            <form onSubmit={this.handleSubmit}>
              {/* TODO: Figure out how to center icon */}
              {/* <Grid item xs={12} alignItems="center">
                <AccountBox className={classes.accountBox} />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  error={error}
                  fullWidth
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error}
                  fullWidth
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  label="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  fullWidth
                  color="primary"
                  variant='contained'
                  type="submit"
                >Login</Button>
                <Typography className={classes.signUp}>
                  Don't have an account? <Link to="/signup">Sign Up!</Link>
                </Typography>
                <ErrorSnackBar open={error} handleClose={this.handleSnackBarClose} />
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch, { history }) => ({
  login: user => dispatch(_login(user, history)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
