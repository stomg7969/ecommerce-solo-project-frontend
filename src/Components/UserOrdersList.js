import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserOrderCard from "./UserOrderCard";
import AdminOnlyOrderList from "./AdminOnlyOrderList";

const UserOrdersList = props => {

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (props.user.isAdmin) {
      console.log("WELCOME ADMIN, FETCHING ALL ORDERS");
      fetch(`${process.env.REACT_APP_HOST}/api/v1/users`)
        .then(r => r.json())
        .then(users => setAllUsers(users));
    }
  }, [props.user.isAdmin]) // in this useEffect, if I pass in a second argument, it understands as value has changes.
  // ... meaning that it will only re-run if passed in variable changes.
  // so it will run again, but if I pass empty [], it will stop because it assumes nothing changed.
  // useEffect as a second argument is equal to componentDidMount

  const updateOrderList = () => {
    props.history.push("/user/profile");
    window.location.reload();
  };

  console.log(props.sales, props.quantity);
  if (props.user.isAdmin) {
    const allUserOrders = allUsers.filter(user => user.orders.length > 0)
      .map(eachUser => <AdminOnlyOrderList key={eachUser.id} user={eachUser} />);

    return (
      <div>
        <h3>TOTAL SALE: ${props.sales}.00</h3>
        <h3>TOTAL {props.quantity} ORDERS</h3>
        <div>
          <button onClick={updateOrderList}>UPDATE</button>
        </div>
        <div id="admin-all-orders">{allUserOrders}</div>
      </div>
    );
  } else if (props.orders) {
    const orderObj = props.orders
      .filter(eachOrder => eachOrder.status === "ordered")
      .map(order => {
        return <UserOrderCard key={order.id} order={order} />;
      });
    return (
      <div>
        <h3>ALL ORDERS</h3>
        <div>{orderObj}</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sales: state.adminTotalSales,
    quantity: state.adminOrderQuantity
  };
};

export default withRouter(connect(mapStateToProps)(UserOrdersList));
