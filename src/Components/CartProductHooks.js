import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TOTAL_AMOUNT } from "../Types";
import axios from "axios";

const CartProductHooks = props => {
  const [eachProduct, setEachProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const eachProduct = props.products.find(
      product => product.id === props.detail.product_id
    );
    setEachProduct(eachProduct);
    dispatch({
      type: TOTAL_AMOUNT,
      payload: parseFloat(eachProduct.price) * parseInt(props.detail.quantity)
    });
    // ********************************************************************
    // Must check if this is stack over flow. If yes, give second argument.
    // ********************************************************************
  }, [props.products, props.detail.quantity, props.detail.product_id, dispatch]);

  const updateFetch = (num, token) => {
    axios(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart/${props.detail.id}`, {
      method: 'patch',
      headers: { Authorization: `Bearer ${ token }` },
      data: { quantity: props.detail.quantity + num }
    })
      .then(() => { window.location.reload() })
      .catch(error => {
        alert(error);
        props.history.push('/cart')
      });
  };

  const deleteFetch = token => {
    fetch(
      `${process.env.REACT_APP_HOST}/order_details/${props.detail.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(r => {
      if (!r.ok) {
        console.log(r);
        props.history.push("/cart");
      } else {
        window.location.reload();
      }
    });
  };

  const clickListener = e => {
    const token = localStorage.getItem("user_token");
    if (e.target.value === "+") {
      console.log("%c ADDING PRODUCT", "color: white");
      updateFetch(1, token);
    } else if (e.target.value === "-") {
      if (props.detail.quantity === 1) {
        console.log("%c DELETING PRODUCT", "color: white");
        deleteFetch(token);
      } else {
        console.log("%c REMOVING PRODUCT", "color: white");
        updateFetch(-1, token);
      }
    }
  };

  const { quantity, size } = props.detail;
  const { name, category, imgBack, price } = eachProduct;

  return (
    <div>
        <div id="cart-items-list">
          <div className="cart items button">
            <button value="-" onClick={clickListener}>
              −
            </button>
            <strong id="quantity"> {quantity} </strong>
            <button value="+" onClick={clickListener}>
              ✚
            </button>
          </div>
          <div className="cart items detail">
            <strong>{name}</strong>
            <br />
            <span>-{category}-</span>
            <br />
            <span>{size}</span>
            <br />
          </div>
          <div>
            <img src={imgBack} alt="for cart" className="cart image" />
          </div>
          <div className="cart items price">
            <strong>${price}0</strong>
          </div>
        </div>
      </div>
  );
};

export default withRouter(CartProductHooks);
