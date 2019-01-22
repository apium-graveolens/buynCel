import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store/auth';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './SearchBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    top: 0,
    background: 'transparent',
    boxShadow: 'none',
    color: 'black'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  logout = () => {
    this.handleMobileMenuClose();
    this.props.logout();
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, auth, cart } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //get number of different items currently in cart
    let numItems = typeof cart !== 'undefined' ? cart.lineItems.length : 0;

    console.log('numItems', numItems > 0)

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem
          onClick={this.handleMenuClose}
          component={Link}
          to='/account'
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={this.props.logout}
        >
          {/* <IconButton color="inherit">
            <ExitIcon />
          </IconButton> */}
          Logout
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem
          onClick={this.handleMobileMenuClose}
          component={Link}
          to="/products"
        >
          <IconButton
            color="inherit"
            component={Link}
            to="/products"
          >
            <ListIcon />
          </IconButton>
          <p>Products</p>
        </MenuItem>
        <MenuItem
          onClick={this.handleMobileMenuClose}
          component={Link}
          to="/cart"
        >
          <IconButton
            color="inherit"
          >
            {numItems > 0 ? (
              <Badge badgeContent={numItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            ) : (
                <ShoppingCartIcon />
              )}
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        {
          auth.user.id ? (
            <Fragment>
              <MenuItem
                onClick={this.handleMobileMenuClose}
                component={Link}
                to="/account" //TODO: setup /account view
              >
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <p>Account</p>
              </MenuItem>
              <MenuItem
                onClick={this.logout}
              >
                <IconButton color="inherit">
                  <ExitIcon />
                </IconButton>
                <p>Logout</p>
              </MenuItem>
            </Fragment>
          )
            :
            (
              <MenuItem
                component={Link}
                to="/login">
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <p>Login</p>
              </MenuItem>
            )
        }
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton> */}
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Celery
            </Typography>
            <SearchBar />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                color="inherit"
                component={Link}
                to="/products"
              >
                <ListIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
              >
                {numItems > 0 ? (
                  <Badge badgeContent={numItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                ) : (
                    <ShoppingCartIcon />
                  )}
              </IconButton>
              {auth.user.id ? (
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )
                :
                <Button
                  component={Link}
                  to="/login"
                >
                  Login
                  </Button>
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, orders }) => {
  const cart = orders.find(order => order.status === 'cart');
  return {
    auth,
    cart,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PrimarySearchAppBar)));