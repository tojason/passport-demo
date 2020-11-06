const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user");

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

// TODO: configure login mechanism LocalStrategy
passport.use('local-login', new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      done(err);
    }
    // username is not found
    if (user === undefined) {
      done(null, false);
    }
    user.verifyPassword(password, done);
  });
}));

// TODO: configure sign up mechanism using LocalStrategy
passport.use('local-signup', new LocalStrategy((username, password, done) => {
  // Create user in our database, then invoke done
  User.findOne({username: username}, (err, user) => {
    if (err) {
      done(err);
    }
    // user exists
    if (user) {
      done(null, false);
    } else {
      let newUser = new User({ username, password });
      newUser.save(error => {
        if (error) {
          done(error);
        }
        done(null, newUser);
      });
    }
  });
}));

module.exports = passport;
