import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, TextField, Button, MenuItem, Select, Typography } from '@material-ui/core';
import { _createReview } from '../store/reviews';

const styles = {
  container: {
    marginTop: 50
  },
  form: {
    width: '100%'
  },
  btn: {
    marginTop: 30
  },
  rating: {
    marginLeft: 85,
    marginBottom: 30
  }
}

class ReviewForm extends Component {
  state = {
    content: '',
    rating: 4
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.addReview(this.state);

    //flip tab back to new review
    this.props.resetTab()

  }
  render() {
    const { classes } = this.props;
    if (this.props.auth.user) {
      if (!this.props.auth.user.id) {
        return <Typography>Please Login to leave a review</Typography>
      } else {
        return (
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid className={classes.container} container justify="center">
              <Grid container justify="center" item={12}>
                <Grid className={classes.rating} item xs={9}>
                  <Select
                    value={this.state.rating}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'rating',
                    }}
                  >
                    <MenuItem value={1}>★</MenuItem>
                    <MenuItem value={2}>★★</MenuItem>
                    <MenuItem value={3}>★★★</MenuItem>
                    <MenuItem value={4}>★★★★</MenuItem>
                    <MenuItem value={5}>★★★★★</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="content"
                  label="Be honest..."
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid container justify="center">
                <Grid className={classes.btn} item xs={1}>
                  <Button type="submit">Submit</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )
      }
    } else {
      return <p>loading</p>
    }
  }
};

// const mapStateToProps = ({ auth }) => (
//   {
//     auth
//   }
// )

const mapDispatchToProps = (dispatch, { product }) => {
  return {
    addReview: review => dispatch(_createReview({ ...review, productId: product.id }))
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(ReviewForm));