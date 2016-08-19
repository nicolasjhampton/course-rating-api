'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next, id) {
  console.log(id);
  Course.findById(id)
        .populate('user')
        .exec(function(err, course) {
          if (err) return next(err);
          
          req.course = course;
          return next();
        });
};
