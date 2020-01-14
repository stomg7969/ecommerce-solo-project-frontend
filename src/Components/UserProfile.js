import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PasswordUpdate from "./PasswordUpdate";
import DeleteAccount from "./DeleteAccount";
import UserOrdersList from "./UserOrdersList";

const UserProfile = props => {
  return (
    <div id="user-profile">
      <br />
      <Switch>
        <Route path="/user/profile/update" component={PasswordUpdate} />
        <Route path="/user/profile/delete" component={DeleteAccount} />
        <Route
          path="/user/profile/orders"
          render={() => (
            <UserOrdersList
              orders={props.currentUser.orders}
              user={props.currentUser}
            />
          )}
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
                {props.currentUser.isAdmin ? null : (
                  <Link to="/user/profile/delete">
                    <button>Delete Accout</button>
                  </Link>
                )}
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.activeUser
  };
};

export default connect(mapStateToProps)(UserProfile);
