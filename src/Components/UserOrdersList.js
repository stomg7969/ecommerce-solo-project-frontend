import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserOrderCard from "./UserOrderCard";
import AdminOnlyOrderList from "./AdminOnlyOrderList";

class UserOrdersList extends Component {
  state = {
    allUsers: []
  };
  componentDidMount() {
    if (this.props.user.isAdmin) {
      console.log("WELCOME ADMIN, FETCHING ALL ORDERS");
      fetch(`${process.env.REACT_APP_HOST}/api/v1/users`)
        .then(r => r.json())
        .then(console.log);
      // .then(data => this.setState({allUsers: data.user}))
    }
  }

  render() {
    if (this.props.user.isAdmin) {
      // const ordersForAdmin = orders
      // .filter(order => order.status !== "pending")
      // .map(order => {
      //   return <AdminOnlyOrderList key={order.id} order={order} />;
      // });
      //
    } else if (this.props.orders) {
      const orderObj = this.props.orders
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
          <h1>hoy</h1>
        </div>
      );
    }
  }
}

export default withRouter(UserOrdersList);
