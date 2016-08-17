'use strict';

var Review = require('../../models').Review;

module.exports = function(req, res, next) {
  console.log(req.course);
  // PUT /api/courses/:id 204 - Updates a course and returns no content
  req.course.reviews = req.course.reviews.filter(function(id) {
    return id !== req.review._id;
  });
  req.course.save(function(err) {
    if(err) return next(err);
    Review.remove({ _id: req.review._id }, function(err2) {
      if(err2) return next(err2);
      res.location('#/detail/' + req.course._id);
      return res.send();
    });
  });
};
