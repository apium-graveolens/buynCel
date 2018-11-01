import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, MenuItem, Button, withStyles, IconButton, Typography, AppBar, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
  right: {
    float: 'right'
  },
  appBar: {
    position: 'absolute',
    top: 0,
    background: 'transparent',
    boxShadow: 'none'
  }
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
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const isHome = this.props.location.pathname == '/';
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon
                fontSize="large"
                onClick={this.handleClick}
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
              <div className={classes.grow}>
                <Typography variant="h6" color="inherit" to='/' component={Link}>
                  Celery
                </Typography>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(NavBar));