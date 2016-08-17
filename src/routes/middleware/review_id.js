'use strict';

var Review = require('../../models').Review;

module.exports = function(req, res, next, id) {
  Review.findById(id)
        .populate('user')
        .exec(function(err, review) {
          if (err) return next(err);

          req.review = review;
          return next();
        });
};
