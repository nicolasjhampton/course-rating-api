'use strict';

module.exports = function(req, res, next) {
  // PUT /api/courses/:id 204 - Updates a course and returns no content
  var course = Object.assign(req.course.toObject(), req.body);
  course.save(function(err) {
    if(err) return next(err);
    return next();
  });
};
