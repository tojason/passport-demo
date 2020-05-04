const User = require("../models/user");
const express = require ('express');
const router = express.Router ();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// sign out user in the request cookie
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:8081');
});

// check if there is a user already login
router.get('/login/check', (req, res) => {
  if (req.isAuthenticated()) { // if (req.user)
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// login
router.post('/login', (req, res, next) => {
  console.log("ENDPOINT - Login");
  passport.authenticate('local-login', (err, isSuccess, userID) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error!",
        data: []
      });
    }
    // username not found or password incorrect
    if (isSuccess === false) {
      res.status(400).json({
        message: "Unable to login",
        data: []
      });
    } else {
      // password is correct
      req.logIn(userID, (error) => {
        if (error) {
          res.status(500).json({
            message: "Internal server error!",
            data: []
          });
        }
        res.status(200).json({
          message: "User is login!",
          data: []
        });
      });
    }
  })(req, res, next);
});

// sign up
router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', function(err, user) {
    if (err) {
      res.status(500).json({
        message: "Internal server error!",
        data: []
      });
    }
    else if (!user) {
      res.status(400).json({
        message: "User already exists!",
        data: []
      });
    } else {
      res.status(201).json({
        message: "User created!",
        data: []
      });
    }
  })(req, res, next);
});


module.exports = router;
