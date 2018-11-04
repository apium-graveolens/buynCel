import React, { Component } from 'react';
import { withStyles, Divider, Tab, TabContainer } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import { _fetchReviews } from '../store/reviews';
import { connect } from 'react-redux';
import Review from './Review';
import ReviewForm from './ReviewForm';

const styles = {
}

class ReviewList extends Component {
  componentDidMount() {
    this.props.loadReviews();
  }
  state = {
    value: 'one',
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  resetTab = () => this.setState({ value: 'one' });
  render() {
    const { value } = this.state;
    const { auth, reviews } = this.props;
    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab value="one" label="Reviews" />
          <Tab value="two" label="Leave a review" />
        </Tabs>
        <Divider />
        {value === 'one' &&
          reviews.map(review => (
            <Review key={review.id} review={review} />
          ))
        }
        {value === 'two' && <ReviewForm resetTab={this.resetTab} auth={auth} product={this.props.product} />}
      </div>
    )

  }
};

const mapStateToProps = ({ reviews, auth }) => {
  return {
    reviews,
    auth
  }
}

const mapDispatchToProps = (dispatch, { product }) => {
  return {
    loadReviews: () => dispatch(_fetchReviews(product.id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReviewList));