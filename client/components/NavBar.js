import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, MenuItem, Button, Grid, withStyles, IconButton, Typography, AppBar, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  left: {
    display: 'flex',
  },
  appBar: {
    position: 'absolute',
    top: 0,
    background: 'transparent',
    boxShadow: 'none'
  },
  title: {
    marginTop: '23px',
  },
  account: {
    marginTop: '13px',
  },
};

class NavBar extends Component {
  state = {
    anchorEl: null,
  }
  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const isHome = this.props.location.pathname == '/';
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Toolbar>
            <Grid
              justify="space-between"
              container
              spacing={24}
            >
              <Grid item className={classes.left}>
                <IconButton
                  className={classes.menuButton}
                  color="inherit" aria-label="Menu"
                  onClick={this.handleClick}
                >
                  <MenuIcon
                    fontSize="large"
                  />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem component={Link} to="/products" onClick={this.handleClose}>Products</MenuItem>
                  <MenuItem component={Link} to="/sign-up" onClick={this.handleClose}>Sign Up</MenuItem>
                  <MenuItem component={Link} to="/login" onClick={this.handleClose}>Login</MenuItem>
                </Menu>
                {!isHome && (
                  <Typography className={classes.title} variant="h6" color="inherit" to='/' component={Link}>
                    Celery
                  </Typography>
                )}
              </Grid>
              <Grid item>
                {auth && (
                  <IconButton className={classes.account}>
                    <AccountCircle fontSize="large" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(NavBar)));