import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/user.profile";
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("error fetching current user");
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Home path="/" user={user} setUser={setUser} />
        <Register path="/register" setUser={setUser} />
        <Login path="/login" setUser={setUser} />
        <Profile path="/profile" user={user} setUser={setUser} />
      </Router>
    </div>
  );
}

export default App;
