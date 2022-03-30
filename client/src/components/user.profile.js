import axios from "axios";
import { Link, navigate } from "@reach/router";

const Profile = (props) => {
  const { user } = props;
  const logout = () => {
    axios.post("http://localhost:8000/api/logout").then(
      (res) => {
        console.log("Logout succeeded", res);
        navigate("/");
      },
      (err) => {
        console.log("Logout failed", err);
      }
    );
  };
  return (
    <div>
      Welcome {user.firstName}
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Profile;
