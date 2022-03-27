import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './master.css'
import { FaStar } from "react-icons/fa";

const Home = () => {
    const [allJobs, setAllJobs] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/job")
        .then((res)=>{
            console.log(res.data);
            setAllJobs(res.data);})
        .catch((err)=>{
            console.log(err);})
        }, []);

    const deleteClick = (event,id) => {
        console.log(id)
        axios.delete("http://localhost:8000/api/job/delete/"+id)
        .then((res)=>{
            console.log(res.data);
            setAllJobs(allJobs.filter(job => job._id != id));})
        .catch((err)=>{
            console.log(err);})
        }
    return(
        <>
            <div className='page-wrap'>
                <h1 className='main-header'>Nomad Job Board</h1>
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
                            allJobs.map((job,idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td><button className='delete-button' onClick={(e)=>deleteClick(e,job._id)}>X</button></td>
                                        <td>today</td>
                                        <td>{job.jobTitle}</td>
                                        <td>{job.region}</td>
                                        <td>{job.city}</td>
                                        <td><FaStar/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
        )
}

export default Home;