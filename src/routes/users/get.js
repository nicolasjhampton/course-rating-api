'use strict';

var errHandle = require('../error-handler.js');
var User = require('../../models/user.js');

module.exports = function(req, res, next) {
  return res.json({ data: [req.user] });
};
