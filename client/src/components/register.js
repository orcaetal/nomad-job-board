import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Register = (props) => {
  const { setUser } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const register = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", {
        firstName,
        lastName,
        email,
        passWord,
        confirmPassword,
      })
      .then(
        (res) => {
          console.log("Login succeeded", res);
          setUser(res.data);
          navigate("/profile");
        },
        (err) => {
          debugger;
          console.log("register failed", err);
          setErrors(err.response.data.errors);
        }
      );
  };
  return (
    <form onSubmit={register}>
      <h1> Create your account</h1>
      <div className="container-sm">
        <div className="mb-3">
          <label className="form-label">First Name: </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName ? <p>{errors.firstName.message}</p> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name: </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName ? <p>{errors.lastName.message}</p> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Email: </label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email ? <p>{errors.email.message}</p> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Password: </label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassWord(e.target.value)}
          />
          {errors.passWord ? <p>{errors.passWord.message}</p> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password: </label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword ? (
            <p>{errors.confirmPassword.message}</p>
          ) : null}
        </div>
        <input className="btn btn-primary" type="submit" />
      </div>
    </form>
  );
};

export default Register;
