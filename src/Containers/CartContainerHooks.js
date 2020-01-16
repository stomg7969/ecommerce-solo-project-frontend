import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
// import backImg from "../Assets/go_back.png";
import { SAVE_USER } from "../Types";
// import CartProduct from "../Components/CartProduct";
import CartContainerDisplayHooks from "./CartContainerDisplayHooks";

const CartContainerHooks = props => {
  const [cart, setCart] = useState({});
  // const [ paid, setPaid ] = useState(false);
  const [haveCartInfo, setHaveCartInfo] = useState(false);
  const [shipping, setShipping] = useState("regular");

  const currentUser = useSelector(state => state.activeUser);
  const totalAmount = useSelector(state => state.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.orders && !haveCartInfo) {
      const token = localStorage.getItem("user_token");
      fetch(`${process.env.REACT_APP_HOST}/api/v1/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(data => dispatch({ type: SAVE_USER, payload: data.user }))
        .then(() => {
          const pendingCart = currentUser.orders.filter(
            order => order.status === "pending"
          );
          setCart(pendingCart);
          setHaveCartInfo(true);
        });
    } else if (currentUser.orders && haveCartInfo) {
      const pendingCart = currentUser.orders.filter(
        order => order.status === "pending"
      );
      setCart(pendingCart);
    }
  }, [currentUser.orders, haveCartInfo, dispatch]);
  // NEED TO TEST THIS useEffect!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  };

  return <CartContainerDisplayHooks
    cart={cart}
    submitListener={submitListener}
    changeListener={changeListener}
  />;
};

export default withRouter(CartContainerHooks);
