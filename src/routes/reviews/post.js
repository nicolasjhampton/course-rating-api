'use strict';

var Review = require('../../models').Review;

module.exports = function(req, res, next) {
  req.body.user = req.user._id;
  Review.create(req.body, function(err, review) {
    if(err) return next(err);
    req.course.reviews.push(review._id);
    req.course.save(function(err) {
      if(err) return next(err);
      return res.status(201)
                .location('api/course/' + req.course._id)
                .send();
    });
  });
};
