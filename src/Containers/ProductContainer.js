import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../Components/ProductCard";

class ProductContainer extends Component {
  componentDidMount() {
    const token = localStorage.getItem("user_token");
    fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      // Redux recommeded due to UserInputContainer.
      .then(products =>
        this.props.dispatch({ type: "store_products", products: products })
      );
  }
  render() {
    const productList = this.props.products.map(product => {
      return <ProductCard product={product} />;
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
