import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../Components/ProductCard";

class ProductContainer extends Component {
  state = {
    add: 4,
    stop: false
  };

  moreProducts = () => {
    this.setState(prevState => ({
      add: prevState.add + 4
    }));
  };

  handleScroll = () => {
    // window height
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
    // console.log(scrollable);
    const scrolled = window.scrollY;
    if (Math.ceil(scrolled) === scrollable && !this.state.stop) {
      this.moreProducts();
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // }

  render() {
    // this.props.products.slice(this.state.start, this.state.end).map...
    const productList = this.props.products
      .slice(0, this.state.add)
      .map(product => {
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
