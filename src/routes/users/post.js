'use strict';

var User = require('../../models/user.js');
var btoa = require('btoa');

module.exports = function(req, res, next) {

  // Create new user
  var user = new User(req.body);

  // Save user
  user.save(function(err) {
   if(err) return next(err);

   // create authorization header
   var authString = btoa(req.body.emailAddress + ':' + req.body.password);
   req.headers['authorization'] = 'Basic ' + authString;

   // goto main page
   return next();
  });

};
