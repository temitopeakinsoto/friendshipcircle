const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();
const passport = require('passport');

//user model
const user = require("../../models/Users");
const Users = require("../../models/Users");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public

router.get("/test", (req, res) => {
  res.json({
    msg: "Test endpoint works",
    status: 200,
  });
});

// @route  GET api/users/register
// @desc   Register new users
// @access Public

router.post("/register", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //Size
          r: "pg", //Rating
          d: "mm", //Default
        });

        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json(user);
                res.status(200);
              })
              .catch((err) => {
                res.json(err);
                res.status(400);
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log("There was an err", err);
    });
});

// @route  GET api/users/login
// @desc   Login a user
// @access Public

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  //check if email exists, otherwise throw an error
  Users.findOne({ email }).then((user) => {
    if (!user) {
      res.json({ msg: "User email not found" });
    }

    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        let { id, name, avatar } = user;
        console.log("user is ", user)
        const payload = { id, name, avatar }; //JWT PAYLOAD

        // Sign token
        jwt.sign(
            payload, 
            keys.SECRET, 
            { expiresIn: 3600 }, 
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
            });
      } else {
        res.status(500).json({ password: "Passord Incorrect" });
      }
    });
  });
});

// @route  GET api/users/current
// @desc   Return current user
// @access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    let { id, name, email } = req.user
    res.json({
        id, name, email
    });
})

module.exports = router;
