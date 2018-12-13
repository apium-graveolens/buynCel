import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ListItemIcon, Divider, List, ListItem, ListItemText, Drawer, Menu, MenuItem, Button, Grid, withStyles, IconButton, Typography, AppBar, Toolbar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAlt from '@material-ui/icons/ListAlt';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { logout } from '../store/auth';
import Search from './Search';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = theme => ({
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
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  root: {
    flexGrow: 1,
  },
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
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
});

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
          <ListItem buttonon onClick={this.props.logout}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary='Logout' />
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
              <div className={classes.grow}></div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                {/* <Search
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                /> */}
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
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