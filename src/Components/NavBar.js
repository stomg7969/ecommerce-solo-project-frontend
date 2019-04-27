import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends React.Component {
  state = {
    activeUsername: ""
  };

  componentDidMount() {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("user_token");
    const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
    console.log("%c CDM in NavBar.js", "color: green", decoded);
    this.setState({ activeUsername: decoded.username });
  }

  clickListener = () => {
    localStorage.removeItem("user_token");
    this.props.history.push("/");
  };

  render() {
    return (
      <div id="menu">
        <h4>Menu Bar here</h4>
        {localStorage.getItem("user_token") ? (
          <h6>Hello, {this.state.activeUsername}</h6>
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
  console.log("%c mapStateToProps NavBar", "color: orange", state.activeUser);
  return {
    activeUser: state.activeUser
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
// if (localStorage.getItem("user_token")) {
//   const jwt = require("jsonwebtoken");
//   const token = localStorage.getItem("user_token");
//   const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
// }
