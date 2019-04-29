import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../Components/ProductCard";

class ProductContainer extends Component {
  render() {
    const productList = this.props.products.map(product => {
      return <ProductCard key={product.id} product={product} />;
    });
    return (
      <div id="product-container">
        <p>will render more when users reach bottom of the page</p>
        <div id="product-list">
          {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
          {productList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ProductContainer);
