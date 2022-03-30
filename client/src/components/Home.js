import React, { useState, useEffect } from "react";
import axios from "axios";
import "./master.css";
import { Link, navigate } from "@reach/router";
import { FaStar } from "react-icons/fa";

const Home = (props) => {
  const { user, setUser } = props;
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/job")
      .then((res) => {
        console.log(res.data);
        setAllJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteClick = (event, id) => {
    console.log(id);
    axios
      .delete("/api/job/delete/" + id)
      .then((res) => {
        console.log(res.data);
        setAllJobs(allJobs.filter((job) => job._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    axios.post("/api/logout").then(
      (res) => {
        console.log("Logout succeeded", res);
        navigate("/");
        setUser(null);
      },
      (err) => {
        console.log("Logout failed", err);
      }
    );
  };

  return (
    <>
      {user == null ? (
        <div>
          <Link to="/login">Login</Link> |&nbsp;{" "}
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <>
          <p>Welcome {user.firstName}</p>
          <Link to="/profile">My Profile</Link>
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        </>
      )}
      <div className="page-wrap">
        <h1 className="main-header">Nomad Job Board</h1>
        <table className="table my-table">
          <thead>
            <tr>
              <th>Admin Delete</th>
              <th>Date Posted</th>
              <th>Job Title</th>
              <th>Region</th>
              <th>City</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {allJobs.map((job, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <button
                      className="delete-button"
                      onClick={(e) => deleteClick(e, job._id)}
                    >
                      X
                    </button>
                  </td>
                  <td>today</td>
                  <td>{job.jobTitle}</td>
                  <td>{job.region}</td>
                  <td>{job.city}</td>
                  <td>
                    <FaStar />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
