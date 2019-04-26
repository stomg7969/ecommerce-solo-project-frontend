import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div id="menu">
        <h4>Menu Bar here</h4>
        <div className="navbar-name">
          <Link to="/">
            <span> |Landing Page| </span>
          </Link>
        </div>
        <div className="navbar-name">
          <Link to="/user">
            <span> |Login| </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
