'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next) {
  var course = new Course(req.body);

  course.save(function(err) {
    if(err) return next(err);

    return res.status(201)
              .location('api/course/' + course._id)
              .end();
  });

};
