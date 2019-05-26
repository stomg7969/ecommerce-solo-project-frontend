import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import box from "../Assets/square_box.png";
import backImg from "../Assets/go_back.png";
import UserLogin from "../Components/UserLogin";
import UserSignup from "../Components/UserSignup";
import UserProfile from "../Components/UserProfile";

const UserContainer = props => {
  return (
    <div>
      <img
        src={backImg}
        alt="go-back button"
        className="top-right go-back"
        onClick={() => props.history.push("/")}
      />
      <Link to="/cart">
        <img id="cart-image" src={box} alt="box noun project" />
        <span id="cart-number">
          {props.itemNum ? props.itemNum : 0}
        </span>
      </Link>
      <h2>{props.currentUser.username}</h2>
      <div id="user-container">
        <Switch>
          <Route path="/user/new" component={UserSignup} />
          <Route path="/user/login" component={UserLogin} />
          <Route path="/user/profile" component={UserProfile} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    itemNum: state.numOfCartItems,
    currentUser: state.activeUser
  };
};

export default withRouter(connect(mapStateToProps)(UserContainer));
