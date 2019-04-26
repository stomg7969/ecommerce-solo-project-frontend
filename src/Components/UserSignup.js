import React from "react";
import { Link, withRouter } from "react-router-dom";
// copied from my auth lab. must be modified
class UserSignup extends React.Component {
  state = {
    name: "",
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
    const { name, email, password } = this.state;
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          password: password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        this.props.currentUser(data);
        localStorage.setItem("user_token", data.jwt);
        this.props.history.push("/");
      });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <h3>Create Account</h3>
        <form onSubmit={this.submitListener}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
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
          <button>Signup (don't click yet)</button>
        </form>
        <Link to="/user">
          <span>login</span>
        </Link>
      </div>
    );
  }
}

export default withRouter(UserSignup);
