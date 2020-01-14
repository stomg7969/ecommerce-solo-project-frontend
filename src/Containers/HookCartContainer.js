import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import backImg from "../Assets/go_back.png";
import { SAVE_USER } from "../Types";
import CartProduct from "../Components/CartProduct";

const HookCartContainer = props => {
  const [ cart, setCart ] = useState({});
  const [ paid, setPaid ] = useState(false);
  const [ haveCartInfo, setHaveCartInfo ] = useState(false);
  const [ shipping, setShipping ] = useState("regular");

  const currentUser = useSelector(state => state.currentUser);
  const products = useSelector(state => state.products);
  const userOrder = useSelector(state => state.userOrder);
  const totalAmount = useSelector(state => state.totalAmount);

  let foundProduct;

  const changeListener = e => setShipping(e.target.value);

  const submitListener = e => {
    e.preventDefault();
    console.log("ORDERING PROCESS STARTING...", cart[0].id);
    // fetch(`${process.env.REACT_APP_HOST}/orders/${this.state.cart[0].id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     total_amount: this.props.totalAmount,
    //     shipping_method: this.state.shipping,
    //     status: "ordered"
    //   })
    // })
    axios.patch(`${process.env.REACT_APP_HOST}/orders/${cart[0].id}`, {
      total_amount: totalAmount,
      shipping_method: shipping,
      status: "ordered"
    })
      .then(r => {
        if (r.statusText !== 'OK') {
          console.log(r);
          props.history.push("/cart");
        } else {
          return r.data;
        }
      })
      // then call below component to update inventory for each product
      .then(orderObj => {
        orderObj.details.forEach(prodDetail => {
          console.log(
            "%c INVENTORY IS BEING UPDATED",
            "color: red; background-color: black",
            prodDetail
          );
          axios.patch(`${process.env.REACT_APP_HOST}/updateinventory/${prodDetail.product.id}`, {
            inventory: prodDetail.product.inventory - prodDetail.quantity
          })
          .then(window.location.reload());
        });
      });

    console.log(cart[0]);
    if (cart[0]) {
      const sortedCart = cart[0].details.sort(
        (x, y) => x.product_id - y.product_id
      );
      foundProduct = sortedCart.map(detail => {
        return (
          <CartProduct
            key={detail.id}
            detail={detail}
            products={products}
          />
        );
      });
    } else {
      return (
        <Fragment>
          <img
            src={backImg}
            alt="go-back button"
            className="top-right go-back"
            onClick={() => props.history.push("/")}
          />
          <h1>Add items to cart</h1>
        </Fragment>
      );
    }
    return (
      <div id="cart">
        <img
          src={backImg}
          alt="go-back button"
          className="top-right go-back"
          onClick={() => {
            props.history.push("/");
            window.location.reload();
          }}
        />
        {userOrder.id ? (
          <span>{userOrder.product.name} updated</span>
        ) : null}
        <h2>Cart</h2>
        <div>{foundProduct}</div>
        <div>
          <div>
            <form id="submit-order-form" onSubmit={submitListener}>
              <strong>Total: ${totalAmount}.00</strong>
              <br />
              <div>
                <span>Choose Shipping: </span>
                <label className="dropdown">
                  <select onChange={changeListener}>
                    <option name="regular" value="regular">
                      Regular
                    </option>
                    <option name="express" value="express">
                      Express
                    </option>
                    <option name="overNight" value="over night">
                      Over Night
                    </option>
                  </select>
                </label>
              </div>
              <div>
                <button>Pay to order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(HookCartContainer);
