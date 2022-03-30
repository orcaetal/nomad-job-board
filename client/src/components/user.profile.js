import axios from "axios";
import { Link, navigate } from "@reach/router";
import { FaStar } from "react-icons/fa";
import TableRow from './TableRow';

const Profile = (props) => {
  const { user, setUser } = props;
  console.log(user)
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
  if (user == null) {
    return null;
  }
  return (
    <div>
      Welcome {user.firstName}
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <Link to="/">Home</Link>
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
                            user.savedJobs.map((job,idx)=>{
                              console.log(job)
                              return(
                              <TableRow job={job} key={idx}/>)}
                                    // <tr key={idx}>
                                    //     <td><button className='delete-button' onClick={(e)=>deleteClick(e,job._id)}>X</button></td>
                                    //     <td>{job.datePosted.slice(6,10)}</td>
                                    //     <td>{job.jobTitle}</td>
                                    //     <td>{job.region}</td>
                                    //     <td>{job.city}</td>
                                    //     <td><FaStar onClick={e => favorite(e,job._id)}/></td>
                                    // </tr>
                                )
                            
                        }
                    </tbody>
                </table>
    </div>
  );
};

export default Profile;
