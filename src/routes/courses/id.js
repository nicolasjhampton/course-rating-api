'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next, id) {
  Course.findById(id)
        .populate('reviews')
        .exec(function(err, data) {
          if (err) return next(err);
          req.course = data;
          return next();
        });
};
