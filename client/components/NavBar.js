import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ListItemIcon, Divider, List, ListItem, ListItemText, Drawer, Menu, MenuItem, Button, Grid, withStyles, IconButton, Typography, AppBar, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAlt from '@material-ui/icons/ListAlt';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

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
    marginTop: '18px',
  },
  account: {
    marginTop: '13px',
  },
};

class NavBar extends Component {
  state = {
    // anchorAccount: null,
    left: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  // handleClick = e => {
  //   this.setState({ anchorEl: e.currentTarget })
  // };
  // handleAccountMenu = e => {
  //   this.setState({ anchorAccount: e.currentTarget })
  // }
  // handleAccountClose = () => {
  //   this.setState({ anchorAccount: null });
  // };
  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };
  render() {
    const { classes, auth } = this.props;
    const { anchorEl, anchorAccount } = this.state;
    const open = Boolean(anchorEl);
    const accountOpen = Boolean(anchorAccount);
    const isHome = this.props.location.pathname == '/';


    const leftMenu = (
      <List>
        <ListItem button component={Link} to="/products">
          <ListItemIcon><ListAlt /></ListItemIcon>
          <ListItemText primary='Products' />
        </ListItem>
        <ListItem button component={Link} to="/cart">
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary='Cart' />
        </ListItem>
        <Divider />
        {auth.id ? (
          <ListItem button>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary='Account' />
          </ListItem>
        ) : (
            ''
          )}
      </List>
    )
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
                  onClick={this.toggleDrawer('left', true)}
                >
                  <MenuIcon
                    fontSize="large"
                  />
                </IconButton>
                {/* <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem component={Link} to="/products" onClick={this.handleClose}>Products</MenuItem>
                  <MenuItem component={Link} to="/sign-up" onClick={this.handleClose}>Sign Up</MenuItem>
                </Menu> */}
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                  >
                    {leftMenu}
                  </div>
                </Drawer>
                {!isHome && (
                  <Typography className={classes.title} variant="h6" color="inherit" to='/' component={Link}>
                    Celery
                  </Typography>
                )}
              </Grid>
              <Grid item className={classes.account}>
                {auth.id ? (
                  <IconButton onClick={this.handleAccountMenu} >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                ) : (
                    <Button
                      component={Link}
                      to="/login"
                    >
                      Login
                  </Button>
                  )}
                {/* <Menu
                  id="account-menu"
                  anchorEl={anchorAccount}
                  open={accountOpen}
                  onClose={this.handleAccountClose}
                >
                  <MenuItem
                  >
                    Account
                  </MenuItem>

                  <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                </Menu> */}
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
};
const mapDispatchToProps = (dispatch, { history }) => {
  return {
    logout: () => {
      dispatch(logout());
      history.push('/');
    }
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NavBar)));