import React from 'react'
//import { json } from 'react-router-dom';

const Profile = (props) => {
    const inputStyle = {
        border: 'none',
        backgroundColor: 'transparent',
        pointerEvents: 'none'
      };
  return (
    <div>
    <div class="container mt-5">
  <div class="card">
    <div class="card-header bg-primary text-white">
      User Details
    </div>
    <div class="card-body">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" id="name" value={`${props.jsonO.name}`} style={inputStyle}  readonly/>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="email" value={props.jsonO.email} style={inputStyle}  readonly/>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address:</label>
        <textarea class="form-control" id="address" rows="3" style={inputStyle} value={props.jsonO.address}  readonly></textarea>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" style={inputStyle}  class="form-control" id="password" value="**********" readonly/>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Profile
