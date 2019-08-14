import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import { SAVE_USER } from "../Types";

const UserSignup = props => {

  const initialState = { username: "", email: "", password: "" };
  const [{ username, email, password }, setState] = useState(initialState);

  // listens to changes and sets states
  const changeListener = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };
  // listens to submit and lets user signup
  const submitListener = e => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      alert("make your input");
      setState({ ...initialState }); // Both work.
      // setState(initialState);
    } else {
      axios.post(`${process.env.REACT_APP_HOST}/api/v1/users`, {
        user: {
          username: username,
          email: email,
          password: password
        }
      })
        .then(r => r.data)
        .then(data => {
          props.dispatch({ type: SAVE_USER, payload: data.user });
          localStorage.setItem("user_token", data.jwt);
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          alert("Username already exist");
          setState({ ...initialState });
          props.history.push("/user/new");
        })
      // .then(data => {
      //   if (data.message) {
      //     alert(data.message);
      //     this.setState({ username: "", password: "" });
      //     this.props.history.push("/user/new");
      //   } else {
      //     // this.props.currentUser(data);
      //     this.props.dispatch({ type: SAVE_USER, payload: data.user });
      //     localStorage.setItem("user_token", data.jwt);
      //     this.props.history.push("/");
      //     window.location.reload();
      //   }
      // });
    }
  };

  return (
    <div>
      <h3>Create Account</h3>
      <form onSubmit={submitListener}>
        <div>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={changeListener}
          />
        </div>
        <div>
          <input
            className="input"
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={changeListener}
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={changeListener}
          />
        </div>
        <br />
        <button>Signup</button>
      </form>
      <Link to="/user/login">
        <button>login</button>
      </Link>
    </div>
  );
}

export default withRouter(connect()(UserSignup));
