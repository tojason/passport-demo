const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: {type: String, require: true},
  password: {type: String, require: true}
});

// TODO: password encryption function
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) next(err);
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
    });
});

// TODO: vertify user password
userSchema.methods.verifyPassword = function(candidatePassword, cb) {
  let _id = this._id;
  bcrypt.compare(candidatePassword, this.password, function(err, result) {
    if (err) {
      cb(err);
    }
    cb(null, result, _id);
  });
};

module.exports = mongoose.model("User", userSchema);
