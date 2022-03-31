import { useState } from "react";
import Details from "./Details";
import axios from "axios";
const TableRow = (props) => {
  const { deleteClick, job, isSaved, setUser } = props;
  const [modalShow, setModalShow] = useState(false);
  const save = (jobId) => {
    axios
      .post("/api/save_job/" + jobId)
      .then((res) => {
        setUser(res.data);
        console.log("save succeeded", res);
      })
      .catch((err) => {
        console.log("save failed", err.response.data);
      });
  };

  const unSave = (jobId) => {
    axios
      .delete("/api/unsave_job/" + jobId)
      .then((res) => {
        setUser(res.data);
        console.log("unsave succeeded", res);
      })
      .catch((err) => {
        console.log("unsave failed", err.response.data);
      });
  };

  return (
    <>
      <tr>
        <td>
          <button
            className="delete-button"
            onClick={(e) => deleteClick(e, job._id)}
          >
            X
          </button>
        </td>
        <td>{job.datePosted.slice(5, 10)}</td>
        <td onClick={() => setModalShow(true)}>{job.jobTitle}</td>
        <td>{job.region}</td>
        <td>{job.city}</td>
        <td>
          {isSaved ? (
            <button onClick={() => unSave(job._id)}>Unsave</button>
          ) : (
            <button onClick={() => save(job._id)}>Save</button>
          )}
        </td>
      </tr>
      {modalShow && (
        <Details
          show={modalShow}
          job={job}
          onClose={() => setModalShow(false)}
        />
      )}
    </>
  );
};

export default TableRow;
