import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserOrderCard from "./UserOrderCard";
import AdminOnlyOrderList from "./AdminOnlyOrderList";

class UserOrdersList extends Component {
  state = {
    allUsers: []
  };

  componentDidMount() {
    if (this.props.user.isAdmin && !this.state.didMount) {
      console.log("WELCOME ADMIN, FETCHING ALL ORDERS");
      fetch(`${process.env.REACT_APP_HOST}/api/v1/users`)
        .then(r => r.json())
        .then(users => this.setState({ allUsers: users }));
      this.setState({ didMount: true });
    }
  }

  updateOrderList = () => {
    this.props.history.push("/user/profile");
    window.location.reload();
  };

  render() {
    console.log(this.props.sales, this.props.quantity);
    if (this.props.user.isAdmin) {
      const allUserOrders = this.state.allUsers
        .filter(user => user.orders.length > 0)
        .map(eachUser => {
          return <AdminOnlyOrderList key={eachUser.id} user={eachUser} />;
        });

      return (
        <div>
          <h3>TOTAL SALE: ${this.props.sales}.00</h3>
          <h3>TOTAL {this.props.quantity} ORDERS</h3>
          <div>
            <button onClick={this.updateOrderList}>UPDATE</button>
          </div>
          <div id="admin-all-orders">{allUserOrders}</div>
        </div>
      );
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

const mapStateToProps = state => {
  return {
    sales: state.adminTotalSales,
    quantity: state.adminOrderQuantity
  };
};

export default withRouter(connect(mapStateToProps)(UserOrdersList));
