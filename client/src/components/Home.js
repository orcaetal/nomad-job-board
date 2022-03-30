import React, { useState, useEffect } from "react";
import axios from "axios";
import "./master.css";
import { Link, navigate } from "@reach/router";
import { FaStar } from "react-icons/fa";
import TableRow from './TableRow';

const Home = (props) => {
  const { user, setUser } = props;
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/job")
      .then((res) => {
        console.log(res.data);
        setAllJobs(res.data.reverse());
        setDisplayJobs(res.data);
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
        setDisplayJobs(displayJobs.filter(job => job._id != id));
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

  const filterResults = (e) => {
    e.preventDefault()

    //filter
    //init temp list [subset of allJobs]
    let filteredJobs = allJobs;

    //if we are filtering by region
    if (e.target.region.value !== 'all'){
        filteredJobs = allJobs.filter(job => job.region === e.target.region.value)
    }
    else{
        filteredJobs = allJobs
    }

    //further filter by keyword search
    if (e.target.keyword.value !== ''){
        //search title and description
        filteredJobs = filteredJobs.filter(job => job.jobDesc.toLowerCase().search(e.target.keyword.value.toLowerCase()) !== -1 
                                                || job.jobTitle.toLowerCase().search(e.target.keyword.value.toLowerCase()) !== -1)
    }
    
    //update state
    setDisplayJobs(filteredJobs)
    
  }

  
  return (
    <>

      <div className='page-wrap'>
                <div className='head-wrap'>
                    <h1 className='main-header' style={{ backgroundImage: "url(/road_banner_2.jpg)" }}><strong>Nomad Job Board</strong></h1>
                </div>

                {user == null ? (
                  <div className="login-wrap">
                    <Link to="/login">Login</Link> |&nbsp;{" "}
                    <Link to="/register">Register</Link>
                  </div>
                ) : (
                  <div className="user-wrap">
                    
                    <p>Welcome {user.firstName}</p>
                    <div>
                      <Link to="/profile">My Profile</Link>
                      <button className="btn btn-primary" onClick={logout}>
                      Logout
                      </button>
                    </div>
                  </div>
                )}
                <div className='search-wrap'>
                    <form onSubmit={e => filterResults(e)}>
                        <h4 className='form-head'>Filter Results</h4>
                        <div className='inner-form'>
                            <div>
                                <label>Contains Keyword:</label>
                                <input name="keyword"></input>
                            </div>
                            <div>
                                <label htmlFor="region-select">Region:</label>
                                <select name="region" id="region-select">
                                    <option value="all">All</option>
                                    <option value="NE">NE</option>
                                    <option value="NW">NW</option>
                                    <option value="SE">SE</option>
                                    <option value="SW">SW</option>
                                </select>
                            </div>
                            
                            <input type="submit" value="Go"></input>
                        </div>
                    </form>
                </div>
                <table className='table my-table'>
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
                        {
                            displayJobs.map((job,idx)=>
                                
                                <TableRow job={job} key={idx}/>
                                    // <tr key={idx}>
                                      
                                    //     {/* <td><button className='delete-button' onClick={(e)=>deleteClick(e,job._id)}>X</button></td>
                                    //     <td>{job.datePosted.slice(6,10)}</td>
                                    //     <td>{job.jobTitle}</td>
                                    //     <td>{job.region}</td>
                                    //     <td>{job.city}</td>
                                    //     <td><FaStar onClick={e => favorite(e,job._id)}/></td> */}
                                    // </tr>
                                
                            )
                        }
                    </tbody>
                </table>
            </div>
    </>
  );
};

export default Home;
