'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next, id) {
  Course.findById(id)
        .populate('user')
        //.populate({path: 'reviews', populate: { path: 'user' }})
        .exec(function(err, course) {
          if (err) return next(err);

          req.course = course;
          return next();
        });
};
