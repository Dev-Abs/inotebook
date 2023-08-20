import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [crendentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...crendentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: crendentials.email,
        password: crendentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged In Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  return (
    <>
      <div className="container my-5">
      <h2 className="mt-3 mb-2">Log In to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="email" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={crendentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              value={crendentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" class="btn btn-primary">
            LogIn
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
