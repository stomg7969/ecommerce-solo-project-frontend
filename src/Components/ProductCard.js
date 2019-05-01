import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  // state = {
  //   productImgClicked: false
  // };
  //
  // clickListener = () => {
  //   this.setState(prevState => ({
  //     productImgClicked: !prevState.productImgClicked
  //   }));
  // };

  render() {
    const { product } = this.props;
    return (
      <div id="product-card">
        {/* each card has a link to product show page */}
        <h5 className="product name">{product.name}</h5>
        {product.inventory === 0 ? (
          <h6>out of stock</h6>
        ) : (
          <h6 className="product price">${product.price}</h6>
        )}
        <Link to={`/products/${product.id}`}>
          <img
            className="product-image"
            src={product.imgFront}
            alt="moonya front img"
          />
        </Link>
      </div>
    );
  }
}

export default ProductCard;
// <img className="product-image" src={!this.state.productImgClicked ? product.imgFront : product.imgBack} alt="moonya front img" onClick={this.clickListener}/>
