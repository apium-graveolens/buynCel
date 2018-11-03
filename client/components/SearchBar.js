import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {_loadProducts} from '../store/products'

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            categoryFilters: [],
            titleFilter: '',
            mode: 'categories'
        }
        this.setCategoryFilter = this.setCategoryFilter.bind(this)
        this.setTitleFilter = this.setTitleFilter.bind(this)
        this.resetFilter = this.resetFilter.bind(this)
    }

    setCategoryFilter(categoryFilters){
        if(categoryFilters.length == 0) return this.resetFilter();
        this.setState({categoryFilters}, () => {
            const filters = this.state.categoryFilters.map( c => c.value)
            this.props.reloadProducts(filters,null)
        })
    }

    setTitleFilter(e){
        this.setState({titleFilter: e.target.value})
        this.props.reloadProducts(null, this.state.titleFilter)
    }

    resetFilter(){
        console.log('worked?')
        this.setState({
            categoryFilters: [],
            titleFilter: ''
        })

        this.props.reloadProducts();
    }

    switchMode(mode){

        this.setState({
            categoryFilter: [],
            titleFilter: '',
            mode
        })

    }

    render(){
        const {categories} = this.props;
        const {categoryFilters, titleFilter, mode} = this.state

        return (
            <div>
                {mode == 'categories' ? 
                <Select
                    placeholder={'Select Categories'}
                    isMulti={true}
                    value={categoryFilters}
                    onChange={this.setCategoryFilter}
                    options={categories}
                /> :
                <input
                    value={titleFilter}
                    onChange={this.setTitleFilter}
                />
                }
                <button onClick={()=>{this.switchMode('categories')}}>Search by Category</button>
                <button onClick={()=>{this.switchMode('titles')}}>Search by Product</button>
                <button onClick={()=> {this.resetFilter()}}>Clear Filters</button>
            </div>
        )
    }
}

const mapStateToProps = ({categories}) => {
    return {
        categories: categories.map(cat => ({
            value: cat.id,
            label: cat.name
        }))
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reloadProducts: (categoryFilter, titleFilter) => {
            dispatch(_loadProducts(categoryFilter, titleFilter))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)