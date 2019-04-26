import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserLogin from "../Components/UserLogin";
import UserSignup from "../Components/UserSignup";
import UserProfile from "../Components/UserProfile";

class UserContainer extends Component {
  render() {
    return (
      <div className="WILL BE DELETED">
        <div className="notLoggedin">
          <h2>User profile comps here</h2>
          <div id="user-container">
            <Switch>
              <Route path="/user/new" component={UserSignup} />
              <Route path="/user" component={UserLogin} />
            </Switch>
          </div>
          <div className="loggedIn">
            {/* <Link to="/">
              <span> |Landing Page| </span>
            </Link> */}
            <Switch>
              <Route path="/user/profile" component={UserProfile} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default UserContainer;

// user clicked login button from the menu
// if local storage is not there, give login view, if new customer? give link to signup page
// if localstoreage exists, then show user profile with CRUD link
