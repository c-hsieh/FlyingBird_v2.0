const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const config = require("config");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");
const Like = require("../../models/Like");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
        // console.log(user);
        return res.status(400).json({ msg: "User already exists" });
    }
    

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
            // console.log("id", user.id);
              const newLike = new Like({
                email,
                like: []
              });
              newLike.save().then(like => {
                res.json(like.like);
              });
              jwt.sign(
                { id: user.id },
                process.env.JWTSECRECT,
                { expiresIn: 60*24*7 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              );
        });
      });
    });
  });
});

module.exports = router;
