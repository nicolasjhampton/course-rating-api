'use strict';

var Course = require('../../models').Course;

module.exports = function(req, res, next) {
  Course.find({})
        .select('_id title')
        .exec(function(err, data) {
          console.log(data);
          return res.json({data: data});
        });
};
