import axios from "axios";
import { Link, navigate } from "@reach/router";

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
    </div>
  );
};

export default Profile;
