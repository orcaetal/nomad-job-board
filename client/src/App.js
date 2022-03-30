import "./App.css";
import { useState } from "react";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/user.profile";
function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <Router>
        <Home path="/" user={user} />
        <Register path="/register" setUser={setUser} />
        <Login path="/login" setUser={setUser} />
        <Profile path="/profile" user={user} setUser={setUser} />
      </Router>
    </div>
  );
}

export default App;
