import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SAVE_USER } from "../Types";
import axios from "axios";

const UserLogin = props => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // listens to submit and lets user log in
  const submitListener = e => {
    e.preventDefault();
    // fetch(`${process.env.REACT_APP_HOST}/api/v1/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       username: username,
    //       password: password
    //     }
    //   })
    // })
    axios.post(`${process.env.REACT_APP_HOST}/api/v1/login`, {
      user: {
          username: username,
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
        alert('invalid');
        // setState({ username: "", password: "" });
        setUsername('');
        setPassword('');
        props.history.push("/user/login");
      })
  };
  // const { username, password } = this.state;
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submitListener}>
        <div>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button>Login</button>
      </form>
      <Link to="/user/new">
        {" "}
        <button>sign up</button>
      </Link>
    </div>
  );
}

export default withRouter(connect()(UserLogin));
