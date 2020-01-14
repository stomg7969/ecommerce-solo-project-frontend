import React from "react";
import { Link } from "react-router-dom";

const ProductCard = props => {
  const { product } = props;
  return (
    <div id="product-card-wrapper">
      {/* each card has a link to product show page */}
      <div id="product-card">
        <h5 className="product name">{product.name}</h5>
        {product.inventory === 0 ? (
          <h6>out of stock</h6>
        ) : (
          <h6 className="product price">${product.price}0</h6>
        )}
      </div>
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

export default ProductCard;
// <img className="product-image" src={!state.productImgClicked ? product.imgFront : product.imgBack} alt="moonya front img" onClick={clickListener}/>
