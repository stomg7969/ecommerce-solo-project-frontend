import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../Components/ProductCard";
import { STORE_PRODUCTS } from "../Types";

class ProductContainer extends Component {
  componentDidMount() {
    const token = localStorage.getItem("user_token");
    // token and authorization is unnecessary because users are able to see
    // all products even when not logged in.
    fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      // Redux recommeded due to UserInputContainer's props requirement.
      .then(products =>
        this.props.dispatch({ type: STORE_PRODUCTS, products: products })
      );
  }
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
