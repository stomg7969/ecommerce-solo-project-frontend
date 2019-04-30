import React from "react";
import { withRouter } from "react-router-dom";
import UserOrderCard from "./UserOrderCard";

const UserOrdersList = props => {
  if (props.orders) {
    const orderObj = props.orders.map(order => {
      return <UserOrderCard key={order.id} order={order} />;
    });
    return (
      <div>
        <h3>All orders</h3>
        <div>{orderObj}</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>hoy</h1>
      </div>
    );
  }
};

export default withRouter(UserOrdersList);
