import React from "react";
import { connect } from "react-redux";
import { ADMIN_TOTAL_SALES } from "../Types";

const AdminOnlyOrderCard = props => {
  props.dispatch({
    type: ADMIN_TOTAL_SALES,
    payload: parseFloat(props.order.total)
  });
  return (
    <div className="admin order info">
      <h4>order#: {props.order.id}</h4>
      <h4>order amount: ${props.order.total}</h4>
      <h4>shipping: {props.order.ship}</h4>
      <h4>Date: {props.order.ordered.slice(0, -8).replace("T", ", ")}</h4>
    </div>
  );
};

export default connect()(AdminOnlyOrderCard);
