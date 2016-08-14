'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next) {
  Course.find({})
        .select('_id title reviews')
        .exec(function(err, data) {
          return res.json({data: data});
        });
};
