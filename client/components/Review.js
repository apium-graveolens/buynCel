import React, { Component } from 'react';
import { withStyles, Grid, Typography, Paper } from '@material-ui/core';
import moment from 'moment';

const styles = {
  container: {
    padding: 50,
    margin: 50,
  }
}

class Review extends Component {
  state = {
    value: 2,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  formatRating = rating => {
    const full = '★';
    const empty = '☆';
    let stars = ''

    for (let i = 0; i < 5; i++) {
      if (i < rating) stars += full;
      else stars += empty
    }
    return stars;
  }
  render() {
    const { classes, review } = this.props;
    return (
      <Paper className={classes.container}>
        <Typography>
          {review.user.email} - {moment(review.createdAt).fromNow()}
        </Typography>
        <Typography>
          {this.formatRating(review.rating)}
        </Typography>
        <Typography>
          {review.content}
        </Typography>
      </Paper>
    )
  }
};

const mapStateToProps = ({ products }, { match }) => {
  const id = match.params.id * 1;
  return {
    product: products[0] ? products.find(product => product.id == id) : {}
  }
}

export default withStyles(styles)(Review);