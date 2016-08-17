'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next) {
  // POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
  var course = new Course(req.body);

  course.save(function(err) {
    if(err) return next(err);

    return next();
  });

};
