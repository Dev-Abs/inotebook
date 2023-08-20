//import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./components/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Profile from "./components/Profile";

function App() {
  const [alert, setAlert] = useState(null);
  const [jsonO, setJsonO] = useState({name: "",email:"",address:""});
  const updateJson = (ename,eemail,eaddress)=>{
    setJsonO({
      name: ename,
      email: eemail,
      address: eaddress
    })
  }
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1750);
  };
  return (
    <NoteState>
      <Router>
        <div>
          <Navbar showAlert={showAlert} updateJson={updateJson} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route exact path="/profile" element={<Profile jsonO={jsonO}/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
