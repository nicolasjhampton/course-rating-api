'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  fullName: {
              type: String,
              required: [true, "A name must be entered"]
            },
  emailAddress: {
                  type: String,
                  required: [true, "An email is required"],
                  unique: true,
                  validate: {
                    validator: function(value) {
                      return /[a-z0-9-_.]+@[a-z0-9-_]+.[a-z.]+/i.test(value);
                    },
                    message: 'Please use a proper email address'
                  }
                },
  password: {
              type: String,
              required: [true, "A password is required"]
            },
  confirmPassword: {
                     type: String,
                     required: [true, "The password must be confirmed"]
                   }
});

// Just came across something talking to patrickm:
// User
// _id (ObjectId, auto-generated)
// fullName (String)
// emailAddress (String)
// hashedPassword (String)

// ^ those are the instructions for our User model

//User
// Must have a fullName value
// Must have an emailAddress value
// Must have a password value
// Must have a confirmPassword value
// The password and confirmPassword values must match
// The provided emailAddress is in the correct format
// The provided emailAddress must not be associated with an existing user

// ^ These are the required validations
// This seems to imply that we need a virtual or two for the
// password and confirmPassword properties.

// Is this on purpose? The instructions never actually state the need
// for password and confirmPassword to be virtual.

UserSchema.path('confirmPassword').validate(function(value) {
  return this.password.indexOf(value) !== -1;
}, "Passwords don\'t match");

UserSchema.path('password').validate(function(value) {
  return /^[a-zA-Z0-9_\-.!@#$%^&*()]{7,}$/.test(value);
}, "Passwords must be at least 7 letters and numbers");

UserSchema.pre('save', function(next) {

  var user = this;

  // Make sure all email addresses are in lowercase, trimmed format
  user.emailAddress = user.emailAddress.toLowerCase().trim();

  // Hash passwords
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      bcrypt.hash(user.confirmPassword, salt, function(err2, hash2) {
        if(err2) return next(err2);
        user.confirmPassword = hash2;
        return next();
      });
    });
  });
});

UserSchema.statics.authenticate = function(credentials, callback) {
  this.findOne({ emailAddress: credentials.name })
      .exec(function(err, user) {
        if(!user) return handleError(callback, 'AuthenticationError', 'A user with specified email was not found', 'AuthenticationError');
        if(err) return callback(err, false);
        bcrypt.compare(credentials.pass, user.password, function(err2, authorization){
          if(err2) return callback(err2, false);
          return callback(err2, authorization, user);
        });
      });
};

function handleError(callback, type, message, property) {
  var err = new Error();
  err.status = 400;
  err.message = type;
  err.errors = {};
  err.errors[property] = [
    { "code": 400 , "message": message }
  ];
  return callback(err, false);
}

var User = mongoose.model("User", UserSchema);


module.exports = User;
