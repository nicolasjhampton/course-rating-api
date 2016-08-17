'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next) {
  Course.find({})
        .select('_id title')
        .exec(function(err, data) {
          if(err) return next(err);

          return res.json({data: data});
        });
};
