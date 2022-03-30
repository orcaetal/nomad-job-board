import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Login = (props) => {
  const { setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e) => {
    e.preventDefault();
    axios.post("/api/login", { email, passWord: password }).then(
      (res) => {
        console.log("Login succeeded", res);
        setUser(res.data);
        navigate("/profile");
      },
      (err) => {
        console.log("Login failed", err);
      }
    );
  };
  return (
    <form onSubmit={onLogin}>
      <h1>Sign in</h1>
      <div className="container-sm">
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            width="10px"
            className="form-control"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password: </label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
      </div>
    </form>
  );
};

export default Login;
