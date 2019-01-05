import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { _searchTerm } from '../store/search';

const styles = theme => ({
    search: {
        height: 30,
        display: 'flex',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginTop: 27,
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
});

class SearchBar extends Component {
    state = {
        searchTerm: ''
    }
    handleSearchChange = e => {
        const searchTerm = e.target.value
        this.setState({ searchTerm });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.search(this.state.searchTerm);
        this.props.history.push('/search');
    }
    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <InputBase
                        value={this.state.searchTerm}
                        onChange={this.handleSearchChange}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </form>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: term => dispatch(_searchTerm(term)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(SearchBar)));
