import React from "react";

const UserOrderCard = props => {
  const { id, status, ordered, ship, total } = props.order;
  return (
    <div className="order history table">
      <table id="order-table">
        <thead>
          <tr className="table-title">
            <th className="table-content">Order#</th>
            <th className="table-content">Status</th>
            <th className="table-content">Date & Time</th>
            <th className="table-content">Shipping</th>
            <th className="table-content">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-content">{id}</td>
            <td className="table-content">{status.toUpperCase()}</td>
            <td className="table-content">
              {ordered.slice(0, -8).replace("T", ", ")}
            </td>
            <td className="table-content">{ship.toUpperCase()}</td>
            <td className="table-content">${total}0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderCard;
