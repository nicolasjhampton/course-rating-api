'use strict';

var User = require('../../models/user.js');

module.exports = function(req, res, next) {
  // Create new user
  var user = new User(req.body);

  // Save user
  user.save(function(err) {
    if(err) return next(err);

    return res.status(201)
              .location('/')
              .end();
  });
};
