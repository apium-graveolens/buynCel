import React, { Component } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

const styles = {
  container: {
    height: '70vh'
  },
  center: {
    textAlign: 'center'
  }
}

class Confirmation extends Component {
  render = () => {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.container} container justify="center" alignItems="center">
          <Grid className={classes.center} item md={7}>
            <Typography gutterBottom variant='h2'>Your order has been placed!</Typography>
            <Typography variant="subheading">Confirmation sent to your email.</Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
};

export default withStyles(styles)(Confirmation);