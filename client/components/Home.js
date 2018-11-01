import React, { Component } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

const styles = {
  root: {
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url('leekNotCelery.jpg')`,
  },
  titleContainer: {
    paddingBottom: '50px'
  },
  title: {
    color: 'rgb(32,32,32,.8)',
    padding: 30,
    paddingBottom: 15
  },
  subTitle: {
    marginLeft: 130,
    fontStyle: 'italic'
  }
}

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid className={classes.root} container justify="center" alignItems="center">
          <Grid className={classes.titleContainer} item xs={12} alignContent="center" lg={6}>
            <Typography className={classes.title} variant="h2">
              Celery
            </Typography>
            <Typography className={classes.subTitle} variant='body1'>
              We fresh
            </Typography>
          </Grid>
        </Grid>
      </div >
    )
  }
}

export default withStyles(styles)(Home);