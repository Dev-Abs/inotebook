import {React,useEffect} from 'react'
import { Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './styles.css'

const Navbar = (props) => {
  let location = useLocation();
  let navigate= useNavigate();
  const handleLogout =()=> {
    localStorage.removeItem('token');
    navigate('/login')
    props.showAlert('Logged Out Successfully', 'success')
  }
  const handleProfile = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
       },
    });
    // const json = response.json();
    const json = await response.json();
    props.updateJson(json.name,json.email,json.address)
  }
  useEffect(() => {
    // Google Analytics
    // ga('send', 'pageview');
    // console.log(location)
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/Home'? "active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/About'? "active": ""} `}to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
      <Link
      
        className="btn btn-secondary mx-2 btn-transparent"
        to="/login"
        role="button" >LogIn</Link>
      <Link
        className="btn btn-secondary mx-2 btn-transparent"
        to="/signup"
        role="button">SignUp</Link>
      </form>: 
      <form className="d-flex">
      <Link to='/profile'><i onClick={handleProfile}  class="fa-solid fa-user fa-fade fa-2xl mt-4 mx-2" style={{color: "#fafafa"}}></i></Link>
      <Link
        onClick={handleLogout}
        className="btn btn-secondary mx-2 btn-transparent"
        to="/login"
        role="button"
      >
        Log Out
      </Link>
      {/* <Link onClick={handleProfile}  class="btn btn-primary mx-2" to="/profile">Profile</Link> */}
      </form>
       }
    </div>
    <form class="d-flex" role="search">
      </form>
  </div>
</nav>
  )
}

export default Navbar
