'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var auth = require('basic-auth');

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
                      return /[a-z0-9-_.]+@[a-z0-9-_]+.[a-z]+/i.test(value);
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
                     required: [true, "A password is required"]
                   }
});

UserSchema.pre('validate', function(next) {
  var user = this;
  if(user.password.indexOf(user.confirmPassword) == -1) {
    var err = new Error('Passwords don\'t match');
    return next(err);
  } else {
    return next();
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
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

UserSchema.statics.authenticate = function(req, callback) {
  var credentials = auth(req);
  this.findOne({ emailAddress: credentials.name })
      .exec(function(err, user) {
        if(err) return callback(err, false);
        bcrypt.compare(credentials.pass, user.password, function(err2, authorization){
          if(err2) return callback(err2, false, user);
          return callback(err2, authorization, user);
        });
      });
};

var User = mongoose.model("User", UserSchema);


module.exports = User;
