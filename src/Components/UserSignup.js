import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SAVE_USER } from "../Types";

class UserSignup extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  };
  // listens to changes and sets states
  changeListener = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // listens to submit and lets user signup
  submitListener = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    fetch(`${process.env.REACT_APP_HOST}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          this.setState({ username: "", password: "" });
          this.props.history.push("/user/new");
        } else {
          // this.props.currentUser(data);
          this.props.dispatch({ type: SAVE_USER, user: data.user });
          localStorage.setItem("user_token", data.jwt);
          this.props.history.push("/");
        }
      });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        <h3>Create Account</h3>
        <form onSubmit={this.submitListener}>
          <label>Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.changeListener}
          />
          <br />

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
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
          <button>Signup</button>
        </form>
        <Link to="/user/login">
          <span>login</span>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // state gives me access to the initialState
  // connect gives me an access to dispatch function.
  // If I don't need any state, I don't need mapStateToProps.
  console.log("state from REDUX", state);
  return {
    name: "nate"
  };
};

export default withRouter(connect(mapStateToProps)(UserSignup));
