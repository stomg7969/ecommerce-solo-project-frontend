import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const PasswordUpdateHooks = props => {
  const [pwInput, setPwInput] = useState({
    currentPW: "",
    newPW: "",
    confirmPW: ""
  });

  const changeListener = e => {
    setPwInput({
      ...pwInput,
      [e.target.name]: e.target.value
    });
  };

  // Submits updated password and PATCH request.
  const submitListener = e => {
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

  const { currentPW, newPW, confirmPW } = pwInput;
    return (
      <div id="update-form">
        <form onSubmit={submitListener}>
          {/* input type is text for testing purpose */}
          <div className="wrapper">
            <input
              className="input"
              type="text"
              placeholder="current password"
              name="currentPW"
              value={currentPW}
              onChange={changeListener}
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
              onChange={changeListener}
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
              onChange={changeListener}
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
};

export default withRouter(PasswordUpdateHooks);
