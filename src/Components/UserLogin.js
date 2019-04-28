import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SAVE_USER } from "../Types";

class UserLogin extends React.Component {
  state = {
    username: "",
    password: ""
  };
  // listens to changes and sets states
  changeListener = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // listens to submit and lets user log in
  submitListener = e => {
    e.preventDefault();
    const { username, password } = this.state;
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          this.setState({ username: "", password: "" });
          this.props.history.push("/user/login");
        } else {
          // this.props.currentUser(data);
          this.props.dispatch({ type: SAVE_USER, user: data.user });
          localStorage.setItem("user_token", data.jwt);
          this.props.history.push("/");
        }
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.submitListener}>
          <label>Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.changeListener}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.changeListener}
          />
          <br />
          <button>Login</button>
        </form>
        <Link to="/user/new">
          {" "}
          <span>sign up</span>
        </Link>
      </div>
    );
  }
}

export default withRouter(connect()(UserLogin));
