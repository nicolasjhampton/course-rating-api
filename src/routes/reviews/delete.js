'use strict';

var Review = require('../../models').Review;

module.exports = function(req, res, next) {
  if(req.course.user == req.user._id || req.review.user == req.user._id) {
    req.course.reviews = req.course.reviews.filter(function(id) {
      return id !== req.review._id;
    });
    req.course.save(function(err) {
      if(err) return next(err);
      Review.remove({ _id: req.review._id }, function(err2) {
        if(err2) return next(err2);
        return res.status(204)
                  .end();
      });
    });
  } else {
    var err = new Error();
    err.status = 401;
    err.message = 'UnauthorizedRequest';
    err.errors = {
      "user": [
        { "code": 401 , "message": 'Review and course do not belong to the current user' }
       ]
     };
    return next(err);
  }
};
