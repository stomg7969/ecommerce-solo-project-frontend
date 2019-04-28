import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class DeleteAccount extends Component {
  confirmDeleteListener = () => {
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
        this.props.history.push("/user/profile");
      } else {
        localStorage.removeItem("user_token");
        alert("Deleted, bye bye");
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <h4>delete confirmation message here</h4>
        <button onClick={this.confirmDeleteListener}>Yes</button>
        <button onClick={() => this.props.history.push("/user/profile")}>
          No
        </button>
      </div>
    );
  }
}
// const DeleteAccount = () => {
//   return (
//     <div>
//       <h4>delete confirmation message here</h4>
//       <button onClick={() => confirmListener()} name='yes'>Yes</button>
//       <button onClick={() => confirmListener()} name='no'>No</button>
//       <p>if yes, delete, if no, go back</p>
//     </div>
//   );
// };

export default withRouter(DeleteAccount);
