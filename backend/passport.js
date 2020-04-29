const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const User = require("./models/user");

// passport.use('github-login', new GitHubStrategy({
//     clientID: '5c05035f80f37af3cddf',
//     clientSecret: '010826174025d7307507b155850dc2723e094a95',
//     callbackURL: "http://localhost:8081/auth/github/callback"
//   }, (accessToken, refreshToken, profile, cb) => {
//     console.log(profile.id);
//     User.find({ username: profile.id }, (err, user) => {
//       if (err) return cb(err, user);
//       if (user) return cb(null, user);
//       let newUser = new User({ username: profile.id, password: profile.id });
//       newUser.save((error) => {
//         if (error) {
//           return cb(error);
//         } else {
//           return cb(null, newUser);
//         }
//       });
//     });
// }));

passport.use('local-login', new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    user.verifyPassword(password, done);
  });
}));

passport.use('local-signup', new LocalStrategy((username, password, done) => {
  User.findOne({ "username": username }, (err, user) => {
    if (err) {
      console.log("Database Error in SignUp: " + err);
      return done(err);
    }
    if (user) {
      // user already exists
      return done(null, !user);
    } else {
      let newUser = new User({ username, password });
      newUser.save((error) => {
        if (error) {
          console.log("Database Error in Saving User: " + error);
          return done(error);
        } else {
          return done(null, newUser);
        }
      });
    }
  });
}));

module.exports = passport;
