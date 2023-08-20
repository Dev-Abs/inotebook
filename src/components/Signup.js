import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [crendentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...crendentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: crendentials.username,
        email: crendentials.email,
        password: crendentials.password,
        address: crendentials.address,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Crenditials", "danger");
    }
  };
  return (
    <>
      <div className="container my-5">
      <h2 className="mt-3 mb-2">Create Account to continue to iNotebook</h2>

        <form class="row g-3" onSubmit={handleSubmit}>
          <div class="col-12">
            <label for="username" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              name="username"
              id="username"
              placeholder="Enter a valid username"
              onChange={onChange}
              value={crendentials.username}
            />
          </div>
          <div class="col-md-6">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              name="password"
              id="password"
              onChange={onChange}
              value={crendentials.password}
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="email"
              onChange={onChange}
              value={crendentials.email}
            />
          </div>
          <div class="col-12">
            <label for="address" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              placeholder="1234 Main St"
              onChange={onChange}
              value={crendentials.address}
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
