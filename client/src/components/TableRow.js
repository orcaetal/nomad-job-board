import { useState } from "react";
import Details from "./Details";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
const TableRow = (job, deleteClick) => {
    const [modalShow, setModalShow] = useState(false);
    //console.log(job.job);
    const favorite = (e, jobId) => {
        console.log('clicked')
        axios.post("/api/save_job/"+jobId)
        .then(
            (res) => {
                console.log("save succeeded", res);
            })
        .catch((err) => {
                console.log("save failed", err.response.data);
            }
            );
        }
    
    
    return (
        <>
        <tr>
            <td>
            <button
                className="delete-button"
                onClick={(e) => deleteClick(e, job.job._id)}
            >
                X
            </button>
            </td>
            <td>{job.job.datePosted}</td>
            <td onClick={() => setModalShow(true)}>{job.job.jobTitle}</td>
            <td>{job.job.region}</td>
            <td>{job.job.city}</td>
            <td>
            <FaStar onClick={e=>favorite(e, job.job._id)}/>
            </td>
        </tr>
        {modalShow && (
            <Details
            show={modalShow}
            job={job.job}
            onClose={() => setModalShow(false)}
            />
        )}
        </>
    );
    };

export default TableRow;