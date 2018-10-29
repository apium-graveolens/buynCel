import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _loadProducts } from '../store/products';

class ProductList extends Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return (
      <div>
        <h1>Product List</h1>
        <ul>
          {this.props.products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => ({ products })
const mapDispatchToProps = dispatch => ({
  init: () => dispatch(_loadProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);