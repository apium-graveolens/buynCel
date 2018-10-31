import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
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

const mapStateToProps = ({ products }) => {
  return { products }
}

export default connect(mapStateToProps)(ProductList);