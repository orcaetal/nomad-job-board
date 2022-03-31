import axios from "axios";
import { Link, navigate } from "@reach/router";
import TableRow from "./TableRow";

const Profile = (props) => {
  const { user, setUser } = props;
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

  const deleteClick = (e, id) => {
    axios
      .delete("/api/job/delete/" + id)
      .then((res) => {
        console.log(res.data);
        setUser({
          ...user,
          savedJobs: user.savedJobs.filter((job) => job._id !== id),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user == null) {
    return null;
  }
  return (
    <div className="user-wrap2">
      <div className="profile-head">
        <p>Welcome {user.firstName}</p>
        <div>
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className="user-info">
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
      </div>
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
          {user.savedJobs.map((job, idx) => {
            return (
              <TableRow
                job={job}
                key={idx}
                isSaved={true}
                deleteClick={deleteClick}
                setUser={setUser}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
