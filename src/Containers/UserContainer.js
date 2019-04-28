import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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
              <Route path="/user/login" component={UserLogin} />
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

export default withRouter(UserContainer);
