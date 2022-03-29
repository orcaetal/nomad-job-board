import "./App.css";
import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/login";
import Register from "./components/register";
function App() {
  // const [user, setUser] = useState();
  return (
    <div className="App">
      <Home />
      {/* <Register path="/register" />
      <Login path="/login" /> */}
    </div>
  );
}

export default App;
