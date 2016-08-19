'use strict';

var User = require('../../models/user.js');
var auth = require('basic-auth');

// Update all routes that require authentication to
// check for the current user and return a 401 HTTP
// status code if not available.

module.exports = function(req, res, next) {
  var credentials = auth(req);
  User.authenticate(credentials, function(err, authorization, user) {
    if (err) return next(err);
    if(authorization) {
      req.user = user;
      req.body.user = req.user._id;
      return next();
    } else {
      var err = new Error();
      err.status = 401;
      err.message = 'AuthenticationError';
      err.errors = {
        "user": [
          { "code": 401 , "message": 'Invalid password or username' }
         ]
       };
      return next(err);
    }
  });
}
