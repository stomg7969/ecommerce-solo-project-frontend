import React from "react";
import { connect } from "react-redux";
import AdminOnlyOrderCard from "./AdminOnlyOrderCard";
import { ADMIN_ORDER_QUANTITY } from "../Types";

const AdminOnlyOrderList = props => {
  const paidOrders = props.user.orders
    .filter(order => order.status !== "pending")
    .map(eachOrder => {
      return <AdminOnlyOrderCard key={eachOrder.id} order={eachOrder} />;
    });
  props.dispatch({
    type: ADMIN_ORDER_QUANTITY,
    payload: parseInt(paidOrders.length)
  });
  return (
    <div id="admin-each-order">
      <h2>{props.user.isAdmin ? "Non-member" : props.user.username} Orders</h2>
      <div className="admin-each-order">{paidOrders}</div>
    </div>
  );
};

export default connect()(AdminOnlyOrderList);
