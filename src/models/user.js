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
                  unique: true
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

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      user.confirmPassword = hash;
      return next();
    });
  });
});

UserSchema.statics.authenticate = function(req, callback) {
  var credentials = auth(req);
  this.findOne({ emailAddress: credentials.name })
      .exec(function(err, user) {
        console.log(user);
        bcrypt.compare(credentials.pass, user.password, function(err, authorization){
          console.log(authorization);
          return callback(authorization, user);
        });
      });
}

// UserSchema.methods.comparePass = function(password, callback) {
//   var user = this;
//   bcrypt.compare(password, user.hashedPassword, function(err, match){
//     return callback(err, match);
//   });
// };

var User = mongoose.model("User", UserSchema);


module.exports = User;
