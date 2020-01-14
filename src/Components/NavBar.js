import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import box from "../Assets/square_box.png";

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
        {localStorage.getItem("user_token") ? (
          <p>{this.props.activeUser ? username : null}</p>
        ) : <p>Hello.</p>}
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
        <div id="cart-image">
          <Link to="/cart">
            <h3 id="cart-number">
              {this.props.itemNum ? this.props.itemNum : 0}
            </h3>
          </Link>
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
    itemNum: state.numOfCartItems,
    activeUser: state.activeUser
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
