import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import box from "../Assets/square_box.png";
// import backImg from "../Assets/go_back.png";
import { ADD_TO_CART, ADD_ONE } from "../Types";

import HookProductShowContainerDisplay from "./HookProductShowContainerDisplay";

const HookProductShowContainer = props => {
  const [imgClicked, setImgClicked] = useState(false);
  const [userInput, setUserInput] = useState({
    quantity: 1,
    size: ""
  });
  const currentUser = useSelector(state => state.activeUser);
  const dispatch = useDispatch();

  // const addToCart = useCallback(
  //   () => dispatch({ type: ADD_TO_CART }),
  //   [dispatch]
  // );

  // const addOne = useCallback(
  //   () => dispatch({ type: ADD_ONE }),
  //   [dispatch]
  // );


  const clickListener = () => setImgClicked(!imgClicked);

  const changeListener = e => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    });
  };

  const getUserId = () => {
    if (localStorage.getItem("user_token")) {
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("user_token");
      const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
      return decoded.user_id;
    } else {
      return null;
    }
  };

  const submitListener = e => {
    e.preventDefault();
    const { quantity, size } = userInput;
    if (quantity < 1 || size === "") {
      alert("check your input");
    } else {
      const pendingOrder = currentUser.orders.find(
        order => order.status === "pending"
      );
      if (pendingOrder) {
        console.log("pendingOrder :", pendingOrder);
        const userToken = localStorage.getItem("user_token");
        // look through each detail product, check if product id and size are the same, if, then update
        const foundDetail = pendingOrder.details.find(
          detail =>
            detail.product_id === props.product.id && detail.size === size
        );
        console.log("SAME THING", foundDetail);
        if (foundDetail) {
          const detailQuantity = foundDetail.quantity;
          const detailId = foundDetail.id;
          console.log("PATCHING", detailQuantity, quantity);
          // I decided not to refactor this requests for the purpose of remembering the format.
          fetch(
            `${process.env.REACT_APP_HOST}/api/v1/add_to_cart/${detailId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`
              },
              body: JSON.stringify({
                quantity: parseInt(detailQuantity) + parseInt(quantity)
              })
            }
          )
            .then(r => r.json())
            .then(newOrder => dispatch({ type: ADD_TO_CART, payload: newOrder }));
        } else {
          console.log("POSTING");
          fetch(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              order_id: pendingOrder.id,
              product_id: props.product.id,
              quantity: quantity,
              size: size
            })
          })
            .then(r => r.json())
            .then(newOrder => {
              dispatch({ type: ADD_TO_CART, payload: newOrder });
              dispatch({ type: ADD_ONE });
            });
        }
      } else {
        console.log("no pendingOrder");
        fetch(`${process.env.REACT_APP_HOST}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            user_id: getUserId(),
            status: "pending"
          })
        })
          .then(r => r.json())
          .then(data => {
            // props.dispatch({ type: ADD_TO_CART, payload: data });
            // not using Redux for cart because it needs to be persisting.
            fetch(`${process.env.REACT_APP_HOST}/api/v1/add_to_cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                order_id: data.id,
                product_id: props.product.id,
                quantity: quantity,
                size: size
              })
            })
              .then(r => r.json())
              .then(newOrder => {
                dispatch({ type: ADD_TO_CART, payload: newOrder });
                dispatch({ type: ADD_ONE });
              });
          });
      }
    }
  };

  const requestLogin = e => {
    e.preventDefault();
    alert("must sign in first");
    props.history.push("/user/login");
  };

  return <HookProductShowContainerDisplay
    product={props.product}
    userInput={userInput}
    imgClicked={imgClicked}
    clickListener={clickListener}
    changeListener={changeListener}
    submitListener={submitListener}
    requestLogin={requestLogin}
  />;
}

export default withRouter(HookProductShowContainer);
