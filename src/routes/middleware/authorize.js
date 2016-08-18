'use strict';

var User = require('../../models/user.js');

module.exports = function(req, res, next) {
  User.authenticate(req, function(err, authorization, user) {
    if (err) return next(err);
    if(authorization) {
      req.user = user;
      req.body.user = req.user._id;
      return next();
    } else {
      var err = new Error();
      err.status = 400;
      err.message = 'AuthenticationError';
      err.errors = {
        "user": [
          { "code": 400 , "message": 'Invalid password or username' }
         ]
       };
      return next(err);
    }
  });
}
