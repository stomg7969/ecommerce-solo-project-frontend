import React from "react";

const CartProduct = props => {
  const eachProduct = props.products.find(
    product => product.id === props.detail.id
  );
  return (
    <div>
      <strong>name: {eachProduct.name}</strong>
      <br />
      <strong>price: {eachProduct.price}</strong>
      <br />
      <strong>category: {eachProduct.category}</strong>
      <br />
      <strong>quantity: {props.detail.quantity}</strong>
      <br />
      <strong>size: {props.detail.size}</strong>
      <br />
      <p>for admin only, Inventory: {eachProduct.inventory}</p>
    </div>
  );
};

export default CartProduct;
