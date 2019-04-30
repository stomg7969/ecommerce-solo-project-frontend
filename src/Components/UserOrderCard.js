import React from "react";

const UserOrderCard = props => {
  console.log("in here", props);
  return (
    <div>
      <h5>Status: {props.order.status}</h5>
      <h5>
        Date & Time: {props.order.ordered.slice(0, -8).replace("T", ", ")}
      </h5>
      <h5>Total: ${props.order.total}</h5>
      <h5>Shipping Method: {props.order.ship}</h5>
    </div>
  );
};

export default UserOrderCard;
