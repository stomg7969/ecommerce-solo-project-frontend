import React, { Component } from "react";
import ProductCard from "../Components/ProductCard";

class ProductContainer extends Component {
  state = {
    add: 6
  };

  // Purpose of this function is to detect page bottom and render additional products.
  moreProducts = () => {
    this.setState(prevState => ({
      add: prevState.add + 6
    }));
  };
  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const scrollable = docHeight - windowHeight;
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable) {
      this.moreProducts();
    }
  };

  componentDidMount() {
    console.log("SCROLL EVENTLISTENER ADDED");
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    // this.props.products.slice(this.state.start, this.state.end).map...
    const productList = this.props.products
      .slice(0, this.state.add)
      .map(product => {
        return <ProductCard key={product.id} product={product} />;
      });
    return <div id="product-list">{productList}</div>;
  }
}

export default ProductContainer;
