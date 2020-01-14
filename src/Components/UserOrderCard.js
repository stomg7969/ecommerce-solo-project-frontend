import React from "react";

const UserOrderCard = props => {
  const { id, status, ordered, ship, total } = props.order;
  return (
    <div className="order history table">
      <table id="order-table">
        <thead>
          <tr className="table-title">
            <th className="table-content title">Order#</th>
            <th className="table-content title">Status</th>
            <th className="table-content title">Date & Time</th>
            <th className="table-content title">Shipping</th>
            <th className="table-content title">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-content row">{id}</td>
            <td className="table-content row">{status.toUpperCase()}</td>
            <td className="table-content row">
              {ordered.slice(0, -8).replace("T", ", ")}
            </td>
            <td className="table-content row">{ship.toUpperCase()}</td>
            <td className="table-content row">${total}0</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserOrderCard;
