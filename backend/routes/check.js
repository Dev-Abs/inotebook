// Import required modules and libraries
const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = '$13$^&*(^$#$12';

// Define a route for creating a user using POST request
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Enter password of at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res.status(400).json({ error: 'Sorry! A user with this email already exists.' });
        }

        const salt = await bcryptjs.genSalt(10);
        const secPass = await bcryptjs.hash(req.body.password, salt);

        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });

        const data = {
          user: {
            id: user.id
          }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        return res.send(`Hello, ${req.body.name}! \n ${authToken}`);
      } catch (error) {
        return res.status(500).send('Some internal server error has occurred!');
      }
    }

    return res.status(400).json({ errors: result.array() });
  }
);

// Define a route for user login using POST request
router.post(
  "/login",
  [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "Please enter valid credentials" });
        }

        const comparePassword = await bcryptjs.compare(password, user.password);
        if (!comparePassword) {
          return res.status(400).json({ error: "Please enter valid credentials" });
        }

        const data = {
          user: {
            id: user.id
          }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        return res.send(`${authToken}`);
      } catch (error) {
        return res.status(500).send('Some internal server error has occurred!');
      }
    }

    return res.status(400).json({ errors: result.array() });
  }
);

module.exports = router;
