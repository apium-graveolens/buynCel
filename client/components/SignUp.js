import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';

class SignUp extends Component {
  state = {
    name: '',
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
    return (
      <Grid item xs={9}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            label="Name"
          />
          <TextField
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            label="Password"
          />
          <Button
            variant='contained'
            type="submit"
          >Create</Button>
        </form>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createUser: user => dispatch(_createUser(user), history)
});

export default connect(null, mapDispatchToProps)(SignUp);
