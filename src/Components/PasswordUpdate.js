import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
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
  // Submits updated password and PATCH request.
  submitListener = e => {
    e.preventDefault();
    const { newPW, confirmPW } = this.state;
    if (newPW === confirmPW) {
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("user_token");
      const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
      console.log("%c Updated info submitted", "color: green", decoded);
      
      axios(`${process.env.REACT_APP_HOST}/api/v1/users/${decoded.user_id}`, {
        method: 'patch', 
        headers: { Authorization: `Bearer ${token}` },
        data: { user: { password: newPW } }
      })
      .then((r) => {
        console.log(r);
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
          <div className="wrapper">
            <input
              className="input"
              type="text"
              placeholder="current password"
              name="currentPW"
              value={currentPW}
              onChange={this.changeListener}
            />
          </div>
          <br />
          <div className="wrapper">
            <input
              className="input"
              type="text"
              placeholder="new password"
              name="newPW"
              value={newPW}
              onChange={this.changeListener}
            />
          </div>
          <br />
          <div className="wrapper">
            <input
              className="input"
              type="text"
              placeholder="confirm password"
              name="confirmPW"
              value={confirmPW}
              onChange={this.changeListener}
            />
          </div>
          <br />
          <button>change</button>
        </form>
        <br />
        <Link to="/user/profile">
          <button>Cancel</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(PasswordUpdate);
