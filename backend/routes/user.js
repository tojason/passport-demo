const user = require("../models/user");
const express = require ('express');
const router = express.Router ();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

// Create User
// router.post('/create', function(req, res) {
//   const newUser = {};
//   if (req.query.username) {
//     newUser.username = req.query.username;
//   }
//   if (req.query.password) {
//     newUser.password = req.query.password;
//   }
//
//   user.findOne({ username: newUser.username }, function(err, post) {
//     if (err) {
//       res.status(500).send({
//         message: "Database Error",
//         data: err
//       });
//     } else if (post) {
//       res.status(400).send({
//         message: "Username already used!",
//         data: null
//       });
//     } else {
//       user.create(newUser, function(error, postNewUser) {
//         if (error) {
//           res.status(500).send({
//             message: error,
//             data: []
//           });
//         } else {
//           res.status(201).send({
//             message: "Ok",
//             data: postNewUser
//           });
//         }
//       });
//     }
//   });
// });

// Login Authenication
// router.post('/login', function(req, res) {
//   user.find({ username: req.query.username}, function(err, userInfo) {
//     if (err) {
//       res.status(500).send({
//         message: err,
//         data: []
//       });
//     } else {
//       if (userInfo === null) {
//         res.status(404).send({
//           message: "User not found!",
//           data: []
//         });
//       } else { // verify password
//         if (userInfo.password === req.query.password) {
//           res.status(200).send({
//             message: "Login Successful!",
//             data: []
//           });
//         } else {
//           res.status(401).send({
//             message: "Incorrect password!",
//             data: []
//           });
//         }
//       }
//     }
//   });
// });

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     console.log('authenticated!');
//     res.json({
//       success: true,
//       message: "user has successfully authenticated",
//       data: []
//     });
//   } else {
//     res.json({
//       success: false,
//       message: "User is not authenticated",
//     });
//   }
// });
//
// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      res.status(500).send({
        message: err,
        data: []
      });
    } else {
      if (user) {
        res.status(201).send({
          message: 'User created!',
          data: []
        });
      } else {
        res.status(400).send({
          message: 'Username alreay exists!',
          data: []
        });
      }
    }
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      res.status(500).send({
        message: err,
        data: []
      });
    } else {
      if (user) {
        // user is
        res.status(200).send({
          message: 'User is authenticated!',
          data: []
        });
      } else {
        res.status(400).send({
          message: 'User password is incorrect!',
          data: []
        });
      }
    }
  })(req, res, next);
});

module.exports = router;
