const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const { stringify } = require("querystring");
// const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", async(req, res) => {
  const { email, password, captcha } = req.body;
  console.log("toLoginAuth")
  console.log(email);
  if (!captcha)return res.status(400).json({ msg: "Please select captcha" });

  // Secret key
  //  process.env.SECRETKEY \;

  // Verify URL
  const query = stringify({
    secret: process.env.SECRETKEY,
    response: captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // Make a request to verifyURL
  const secret = await fetch(verifyURL).then(res => res.json());
  console.log("secret", secret);
  // If not successful
  if (secret.success !== undefined && !secret.success)
    return res.status(400).json({msg: 'Failed captcha verification' });

  // // If successful
  // return res.json({ success: true, msg: 'Captcha passed' });
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User Does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        process.env.JWTSECRECT,
        { expiresIn: 60 * 60 * 24 * 7 },
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

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  console.log("Get user data");
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ msg: `Invalid credentials, ${err}` }));
});

module.exports = router;
