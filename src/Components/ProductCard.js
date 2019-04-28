import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import ProductShowContainer from '../Containers/ProductShowContainer'

class ProductCard extends Component {
  state = {
    productImgClicked: false
  };

  clickListener = () => {
    this.setState(prevState => ({
      productImgClicked: !prevState.productImgClicked
    }));
  };

  render() {
    const { product } = this.props;
    return (
      <div id="product-card">
        {/* each card has a link to product show page */}
        <h5>{product.name}</h5>
        <img
          className="product-image"
          src={
            !this.state.productImgClicked ? product.imgFront : product.imgBack
          }
          alt="moonya front img"
          onClick={this.clickListener}
        />
      </div>
    );
  }
}

export default ProductCard;
