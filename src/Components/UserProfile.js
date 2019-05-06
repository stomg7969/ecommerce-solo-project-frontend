import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PasswordUpdate from "./PasswordUpdate";
import DeleteAccount from "./DeleteAccount";
import UserOrdersList from "./UserOrdersList";

class UserProfile extends Component {
  render() {
    return (
      <div id="user-profile">
        <br />
        <Switch>
          <Route path="/user/profile/update" component={PasswordUpdate} />
          <Route path="/user/profile/delete" component={DeleteAccount} />
          <Route
            path="/user/profile/orders"
            render={() => <UserOrdersList orders={this.props.orders} />}
          />
          <Route
            path="/user/profile"
            render={() => {
              return (
                <div id="profile-update">
                  <Link to="/user/profile/update">
                    <button>Change PW</button>
                  </Link>
                  <br />
                  <Link to="/user/profile/orders">
                    <button>See All orders</button>
                  </Link>
                  <br />
                  <Link to="/user/profile/delete">
                    <button>Delete Accout</button>
                  </Link>
                </div>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.activeUser.orders
  };
};

export default connect(mapStateToProps)(UserProfile);
