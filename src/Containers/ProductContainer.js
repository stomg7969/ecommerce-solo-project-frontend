import React, { Component } from "react";
import ProductCard from "../Components/ProductCard";

class ProductContainer extends Component {
  render() {
    return (
      <div id="product-container">
        {/* <Link to="/">
          <span> |Landing Page| </span>
        </Link> */}
        <h2>Product list here (below user search)</h2>
        <p>will render more when users reach bottom of the page</p>
        <ProductCard />
      </div>
    );
  }
}

export default ProductContainer;
