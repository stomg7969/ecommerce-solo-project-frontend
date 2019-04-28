import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SAVE_USER } from "../Types";

class NavBar extends React.Component {
  state = {
    activeUsername: ""
  };

  componentDidMount() {
    if (localStorage.getItem("user_token")) {
      // use 'jsonwebtoken' to easily get user_id and username
      // but this will never run if website start without localStorage
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("user_token");
      const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
      console.log("%c CDM in NavBar.js", "color: green", decoded);

      // const token = localStorage.getItem("user_token");
      // GET request to always store 'this' user object to Redux store
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(data => {
          this.setState({ activeUsername: decoded.username });
          this.props.dispatch({ type: SAVE_USER, user: data.user });
        });
    }
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
    activeUsername: state.activeUser
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
// if (localStorage.getItem("user_token")) {
//   const jwt = require("jsonwebtoken");
//   const token = localStorage.getItem("user_token");
//   const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
// }
