import React, { Component } from 'react';
import { Grid, TextField, Button, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  viewContainer: {
    height: '100vh'
  },
  formContainer: {
    marginTop: '-240px',
    width: '100%',
  },
  button: {
    marginTop: 30
  },
  accountBox: {
    fontSize: 150,
    textAlign: 'center',
  }
}

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.state)
    this.props.createUser(this.state);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.viewContainer} container justify="center" alignItems="center">
        <Grid container justify="center" alignItems="center" item xs={6} md={4} lg={2} xlg={2}>
          <div className={classes.formContainer}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                label="Name"
              />
              <TextField
                fullWidth
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                label="Email"
              />
              <TextField
                fullWidth
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                label="Password"
              />
              <Button
                className={classes.button}
                fullWidth
                color="primary"
                variant='contained'
                type="submit"
              >Sign Up</Button>
            </form>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createUser: user => dispatch(_createUser(user), history)
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignUp));
