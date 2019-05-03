import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends React.Component {
  clickListener = () => {
    localStorage.removeItem("user_token");
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    const { username } = this.props.activeUser;
    return (
      <div className="top-right button nav-1" id="navnav">
        <h4>MENU</h4>
        {localStorage.getItem("user_token") ? (
          <h5>Hello, {this.props.activeUser ? username : null}</h5>
        ) : null}
        <div className="navbar-name">
          <Link to="/" className="link-1">
            <span> |HOME| </span>
          </Link>
        </div>
        <div className="navbar-name">
          {localStorage.getItem("user_token") ? (
            <Link to="/user/profile" className="link-1">
              <span> |PROFILE| </span>
            </Link>
          ) : (
            <Link to="/user/login" className="link-1">
              <span> |LOGIN| </span>
            </Link>
          )}
        </div>

        <div className="navbar-name">
          {localStorage.getItem("user_token") ? (
            <span className="link-1" onClick={this.clickListener}>
              {" "}
              |LOGOUT|{" "}
            </span>
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
