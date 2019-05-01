import React from "react";
import { withRouter } from "react-router-dom";

const DeleteAccount = props => {
  const confirmDeleteListener = () => {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("user_token");
    const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
    console.log("%c Checking before delete", "color: green", decoded);
    fetch(`${process.env.REACT_APP_HOST}/api/v1/users/${decoded.user_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(r => {
      if (!r.ok) {
        console.log(r);
        props.history.push("/user/profile");
      } else {
        localStorage.removeItem("user_token");
        alert(`Deleted, bye bye ${decoded.username}`);
        props.history.push("/");
      }
    });
  };

  return (
    <div>
      <h4>delete confirmation message here</h4>
      <button onClick={() => confirmDeleteListener()}>Yes</button>
      <button onClick={() => props.history.push("/user/profile")}>No</button>
    </div>
  );
};

export default withRouter(DeleteAccount);
