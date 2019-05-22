import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

const DeleteAccount = props => {
  const confirmDeleteListener = () => {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("user_token");
    const decoded = jwt.verify(token, process.env.REACT_APP_AUTH_KEY);
    console.log("%c Checking before delete", "color: green", decoded);
    
    axios.delete(`${process.env.REACT_APP_HOST}/api/v1/users/${decoded.user_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem("user_token");
        alert(`Deleted, bye bye ${decoded.username}`);
        props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        alert('Delete failed');
        props.history.push("/user/profile");
      })
  };

  return (
    <div>
      <h4>Delete confirmation</h4>
      <br />
      <button onClick={() => confirmDeleteListener()}>Yes</button>
      <button onClick={() => props.history.push("/user/profile")}>No</button>
    </div>
  );
};

export default withRouter(DeleteAccount);
