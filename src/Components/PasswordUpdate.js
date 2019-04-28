import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// copied from my auth lab. must be modified
class PasswordUpdate extends Component {
  state = {
    currentPW: "",
    newPW: "",
    confirmPW: ""
  };
  // listens to changes and set states
  changeListener = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // jsonwebtoken library.
  // I don't have to passdown user props from parent component.
  // I can just get user_id right away.

  // updates user password.
  submitListener = e => {
    e.preventDefault();
    const { newPW, confirmPW } = this.state;
    if (newPW === confirmPW) {
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("user_token");
      const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
      console.log("%c Updated info submitted", "color: green", decoded);

      fetch(`${process.env.REACT_APP_HOST}/api/v1/users/${decoded.user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: { password: newPW }
        })
      }).then(() => {
        alert("success");
        this.props.history.push("/");
      });
    } else {
      alert("confirm again");
    }
  };

  render() {
    const { currentPW, newPW, confirmPW } = this.state;
    return (
      <div id="update-form">
        <form onSubmit={this.submitListener}>
          {/* input type is text for testing purpose */}
          <input
            type="text"
            placeholder="current password"
            name="currentPW"
            value={currentPW}
            onChange={this.changeListener}
          />
          <br />
          <input
            type="text"
            placeholder="new password"
            name="newPW"
            value={newPW}
            onChange={this.changeListener}
          />
          <br />
          <input
            type="text"
            placeholder="confirm password"
            name="confirmPW"
            value={confirmPW}
            onChange={this.changeListener}
          />
          <br />
          <button>change</button>
        </form>
        <Link to="/user/profile">
          <span>Cancel</span>
        </Link>
      </div>
    );
  }
}

export default withRouter(PasswordUpdate);
