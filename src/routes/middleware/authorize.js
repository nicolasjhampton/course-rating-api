'use strict';

var errHandle = require('../error-handler.js');
var User = require('../../models/user.js');

module.exports = function(req, res, next) {
  User.authenticate(req, function(err, authorization, user) {
    if (err) return next(err);
    if(authorization) {
      req.user = user;
      return next();
    } else {
      return errHandle(next, 'Authentication error', 400);
    }
  });
}
