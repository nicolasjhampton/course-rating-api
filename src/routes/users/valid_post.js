'use strict';

var errHandle = require('../error-handler.js');

module.exports = function(req, res, next) {

  // Check that all fields were filled out
  if(req.body.fullName &&
     req.body.emailAddress &&
     req.body.password &&
     req.body.confirmPassword) {

    // Check if passwords match
    if(req.body.confirmPassword == req.body.password) {
      return next();
    } else {
      return errHandle(next, 'Passwords don\'t match', 400);
    }

  } else {
    return errHandle(next, 'Please fill all fields', 400);
  }

}
