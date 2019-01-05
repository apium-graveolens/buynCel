import React, { Fragment, Component } from 'react';
import { withStyles, Grow, ClickAwayListener, Popper, MenuItem, IconButton, Paper, MenuList } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../store/auth';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

class UserButton extends Component {
  state = {
    open: false,
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  render() {
    const { logout } = this.props;
    const { open } = this.state;
    return (
      <Fragment>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <AccountCircle fontSize="large" />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem component={Link} to="/profile" onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    logout: () => {
      dispatch(logout());
      history.push('/');
    }
  }
}

export default withRouter(withStyles(styles)(connect(null, mapDispatchToProps)(UserButton)));