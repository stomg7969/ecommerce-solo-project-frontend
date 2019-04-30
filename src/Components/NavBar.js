import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { SAVE_USER } from "../Types";

class NavBar extends React.Component {
  clickListener = () => {
    localStorage.removeItem("user_token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="top-right button">
        <h4>Menu Bar here</h4>
        {localStorage.getItem("user_token") ? (
          <h6>
            Hello,{" "}
            {this.props.activeUser ? this.props.activeUser.username : null}
          </h6>
        ) : null}
        <div className="navbar-name">
          <Link to="/">
            <span> |Landing Page| </span>
          </Link>
        </div>
        <div className="navbar-name">
          {localStorage.getItem("user_token") ? (
            <Link to="/user/profile">
              <span> |User Profile| </span>
            </Link>
          ) : (
            <Link to="/user/login">
              <span> |Login| </span>
            </Link>
          )}
          {localStorage.getItem("user_token") ? (
            <span onClick={this.clickListener}> |Logout| </span>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    "%c mapStateToProps NavBar",
    "color: orange; background-color: black",
    state.activeUser
  );
  return {
    activeUser: state.activeUser
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
