import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PasswordUpdate from "./PasswordUpdate";
import DeleteAccount from "./DeleteAccount";
import UserOrdersList from "./UserOrdersList";

class UserProfile extends Component {
  componentDidMount() {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("user_token");
    const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
    //
    console.log(
      "%c IN USER PROFILE",
      "background: #222; color: yellow",
      "jwt decoded: ",
      decoded
    );
  }
  // profile page. has a button that calls PasswordUpdate component
  render() {
    return (
      <div id="user-profile">
        <h3>profile info here</h3>
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
                  <Link to="/user/profile/delete">
                    <button>Delete Accout</button>
                  </Link>
                  <Link to="/user/profile/orders">
                    <span>See All my orders</span>
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
