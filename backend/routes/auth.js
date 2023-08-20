// Import required modules and libraries
const express = require("express"); // Import the Express.js framework
const User = require("../models/User"); // Import the User model from a file "../models/User"
const fetchuser = require("../middleware/fetchuser"); // Import the User model from a file "../models/User"
const { body, validationResult } = require("express-validator"); // Import functions for request validation
const bcryptjs =require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router(); // Create an instance of an Express router

const JWT_SECRET = '$13$^&*(^$#$12'

// Define a route for creating a user using POST request
// Endpoint: "/createuser"
// ROUTE 1: This route doesn't require authentication and doesn't require the user to be logged in

router.post(
  "/createuser",
  [
    // Define validation rules for the incoming request body
    body("name", "Enter a valid name").isLength({ min: 3 }), // Name should have a minimum length of 3 characters
    body("email", "Enter a valid email address").isEmail(), // Email should be a valid email format
    body("password", "Enter password of at least 5 characters").isLength({ min: 5 }), // Password should have a minimum length of 5 characters
    body("address", "Enter valid Address").isLength({ min: 15 }), // Password should have a minimum length of 5 characters
  ],
  async (req, res) => {
    // Validate the request against the defined rules
    const result = validationResult(req);
    let success = false;
    // If there are no validation errors
    if (result.isEmpty()) {
      // Create a new user using the User model and the data from the request body
      // Check whether the user with same email exist or not
      try {
        
        let user = await User.findOne({email: req.body.email});
        if(user){
          return res.status(400).json({success: success,error: 'Sorry! a user with this email already exists.'})
        }
        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(req.body.password,salt)
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
          address: req.body.address
        })
        const data = {
          user: {
            id: user.id
          }
        }

        const authToken = jwt.sign(data,JWT_SECRET)
        success=true;
        // return user;
        // .then((user) => res.json(user)) // Return the created user as a JSON response
        // .catch((err) => {
          //   console.log(err); // Log the error
          //   res.json({ error: "Please enter a valid/unique email" }); // Send an error response
          // });
          return res.json({success: success, authToken:authToken});
        } catch (error) {
        return res.status(500).send('some internal server error has occured!')
        }
    }

    // If there are validation errors, send the array of errors as a response
    res.send({ errors: result.array() });
    //res.send(req.body);
  }
);

// Define a route for creating a user using POST request
// Endpoint: "/login"
// ROUTE 2: This route doesn't require authentication and doesn't require the user to be logged in

router.post(
  "/login",
  [
    // Define validation rules for the incoming request body
    body("email", "Enter a valid email address").isEmail(), // Email should be a valid email format
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
    // Validate the request against the defined rules
    const result = validationResult(req);
    let success = false;
    // If there are no validation errors
    if (result.isEmpty()) { 
      const {email,password} = req.body;
      try {
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({success: success,error: "Please enter valid crenditials"})
        }
        const comparePassword = await bcryptjs.compare(password,user.password) 
        if(!comparePassword){
          return res.status(400).json({success: success,error: "Please enter valid crenditials"})
        }

        const data = {
          user: {
            id: user.id
          }
        }

        const authToken = jwt.sign(data,JWT_SECRET)
        success=true;
        return res.json({success: success,authToken: `${authToken}`});
      } catch (error) {
        return res.status(500).send('some internal server error has occured!')
      }
    }

    // If there are validation errors, send the array of errors as a response
    res.send({ errors: result.array() });
    //res.send(req.body);
  })



// Endpoint: "/getuser"
// ROUTE 3: This route require authentication and require the user to be logged in
// POST: api/auth/getuser
router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      let userId =req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      return res.status(500).send('some internal server error has occured!')
    }})

// Export the router to be used in other parts of the application
module.exports = router;
